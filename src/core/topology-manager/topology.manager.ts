import { Package, Project, Workspace } from '@yarnpkg/core';

import { TopologyNode } from './models/topology.node';
import { TopologyReport } from './topology.types';

export class TopologyManager {
  public async buildTree(project: Project): Promise<TopologyReport> {
    await project.restoreInstallState();

    const workspaces = this.getEssentialWorkspaces(project);
    if (workspaces.length === 0) {
      throw new Error(`Project doesn't have any essentail workspaces`);
    }

    const essentails = workspaces.map((workspace) => {
      const node = new TopologyNode(workspace);
      this.fillChildrenNodes(project, node);

      return node;
    });

    const root = new TopologyNode(project.topLevelWorkspace);
    root.children = new Set(essentails);

    return root;
  }

  private getWorkspacePackage(project: Project, workspace: Workspace): Package {
    const packageData = project.storedPackages.get(workspace.anchoredLocator.locatorHash);
    if (!packageData) {
      throw new Error('Unknown workspace');
    }

    return packageData;
  }

  private getEssentialWorkspaces(project: Project): Workspace[] {
    return project.workspaces.filter((workspace) => {
      if (workspace.locator.name === project.topLevelWorkspace.locator.name) {
        return false;
      }

      return this.getWorkspaceInternalDependencies(project, workspace).size === 0;
    });
  }

  private getWorkspaceInternalDependencies(project: Project, workspace: Workspace): Set<Workspace> {
    const packageData = this.getWorkspacePackage(project, workspace);
    const workspaces: Set<Workspace> = new Set();

    [...packageData.dependencies, ...packageData.peerDependencies].forEach(([_hash, data]) => {
      const dependency = project.tryWorkspaceByIdent(data);
      if (dependency) {
        workspaces.add(dependency);
      }
    });

    return workspaces;
  }

  private getWorkspaceExternalDependencies(project: Project, workspace: Workspace): Set<Workspace> {
    const usedWorkspaces = project.workspaces.filter((sample) => {
      const packageData = this.getWorkspacePackage(project, sample);
      return (
        packageData.dependencies.has(workspace.locator.identHash) ||
        packageData.peerDependencies.has(workspace.locator.identHash)
      );
    });

    return new Set(usedWorkspaces);
  }

  private fillChildrenNodes(project: Project, rootNode: TopologyNode): void {
    const { workspace, history } = rootNode;

    const dependences = this.getWorkspaceExternalDependencies(project, workspace);
    dependences.forEach((dependency) => {
      const hash = dependency.locator.locatorHash;
      if (history.has(hash)) {
        return;
      }

      const localNode = new TopologyNode(dependency, history);
      rootNode.children.add(localNode);

      this.fillChildrenNodes(project, localNode);
    });
  }
}