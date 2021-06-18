import { LocatorHash, Project } from '@yarnpkg/core';

import { openVersionFile } from '../../utils/version.utils';
import { reportGenerator } from './utils/report.generator';
import { ReportModel, ReportGeneratorOptions, ReportWorkspaceModel } from './report.types';
import { TopologyManager, TopologyNode } from '../topology-manager';

export class ReportManager {
  private topologyManager: TopologyManager = new TopologyManager();

  public async generateReport(project: Project, options: ReportGeneratorOptions): Promise<ReportModel> {
    const { ignoreRoot = false, topological = true } = options || {};

    const info = await openVersionFile(project);
    if (!info) {
      throw new Error('No any relevant information about the project');
    }

    const ignoreList = ignoreRoot ? [project.topLevelWorkspace.locator.locatorHash] : [];
    const report = reportGenerator(info, ignoreList);
    if (topological) {
      report.changedWorkspaces = await this.topologicalWorkspaces(project, report.changedWorkspaces);
    }

    return report;
  }

  private async topologicalWorkspaces(
    project: Project,
    workspaces: ReportWorkspaceModel[],
  ): Promise<ReportWorkspaceModel[]> {
    const tree = await this.topologyManager.buildTree(project);
    const rankedList = new Map();
    this.fillRankedToplogicalList(tree, rankedList);

    return workspaces.sort((a, b) => {
      return rankedList.get(a.locatorHash) <= rankedList.get(b.locatorHash) ? -1 : 1;
    });
  }

  private fillRankedToplogicalList(node: TopologyNode, rankedList: Map<LocatorHash, number>, deep: number = 0): any {
    const existinfRank = rankedList.get(node.workspace.locator.locatorHash);
    if (existinfRank === undefined || existinfRank < deep) {
      rankedList.set(node.workspace.locator.locatorHash, deep);
    }
    node.children.forEach((children) => {
      this.fillRankedToplogicalList(children, rankedList, deep + 1);
    });
  }
}
