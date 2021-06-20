import { Project } from '@yarnpkg/core';

import { openVersionFile } from '../../utils/version.utils';
import { NoChangesError } from '../errors/no-changes.error';
import { GraphManager } from '../graph-manager';

export class VersionManager {
  protected graphManager: GraphManager;

  constructor() {
    this.graphManager = new GraphManager();
  }

  public async buildReleaseGraph(project: Project): Promise<any> {
    const rootNode = await this.graphManager.buildGraph(project);
    const versionFile = await openVersionFile(project);
    if (!versionFile) {
      throw new NoChangesError();
    }

    return;
  }
}
