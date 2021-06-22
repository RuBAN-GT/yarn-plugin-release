import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { WorkspaceTreeResolver, WorkspaceTreeManager } from '../../../core/workspace-tree';
import { openVersionFile } from '../../../utils/version.utils';
import { NoChangesError } from '../../../core/errors';

export class CheckCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Prints workspaces that should be utilized.',
  });

  // Dependencies
  public readonly workspaceResolver: WorkspaceTreeResolver = new WorkspaceTreeResolver();

  // Commands
  @Command.Path('release', 'version', 'check')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const rootNode = await this.workspaceResolver.resolve(project);
    const treeManager = new WorkspaceTreeManager(rootNode);

    const versionFile = await openVersionFile(project);
    if (!versionFile) {
      throw new NoChangesError();
    }

    // @TODO Put into group manager
    const affectedNodes = treeManager.findNodesByWorkspaces(versionFile.changedWorkspaces);
    const chains = affectedNodes.map((node) => {
      return [...node.chain].map((locator) => {
        const { manifest } = project.getWorkspaceByLocator(locator);
        return manifest.raw.name;
      });
    });

    console.dir('Affected chains:');
    chains.forEach((chain) => console.dir(chain.join(' → ')));
  }
}
