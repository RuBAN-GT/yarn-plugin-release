import { Project } from '@yarnpkg/core';

import { openVersionFile, VersionFile } from '../../utils/version.utils';
import { NoChangesError } from '../errors';
import { WorkspaceNode, WorkspaceTreeManager, WorkspaceTreeResolver } from '../workspace-tree';

export class VersionManager {
  protected readonly workspaceResolver: WorkspaceTreeResolver;

  constructor() {
    this.workspaceResolver = new WorkspaceTreeResolver();
  }

  public async findCandidates(project: Project): Promise<WorkspaceNode[]> {
    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);
    const versionFile = await this.generateVersionFile(project);

    const changedWorkspaces = [...versionFile.changedWorkspaces].filter((w) => w !== project.topLevelWorkspace);
    const affectedNodes = treeManager.findNodesByWorkspaces(changedWorkspaces);

    return affectedNodes;
  }

  protected async generateVersionFile(project: Project): Promise<VersionFile> {
    const versionFile = await openVersionFile(project);
    if (!versionFile) {
      throw new NoChangesError();
    }

    return versionFile;
  }
}
