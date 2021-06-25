import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { VersionManager } from '../../../core/version-manager';

export class CheckCommand extends Command<CommandContext> {
  // Meta
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Prints workspaces that should be utilized.',
  });

  // Dependencies
  public readonly versionManager: VersionManager = new VersionManager();

  // Commands
  @Command.Path('release', 'version', 'check')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const affectedNodes = await this.versionManager.findCandidates(project);

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
