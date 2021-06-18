import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';

import { TopologyManager } from '../../core/topology-manager/topology.manager';

export class TopologyCommand extends Command<CommandContext> {
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Generate json topological tree',
  });

  public topologyManager: TopologyManager = new TopologyManager();

  @Command.Path('release', 'tree')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const tree = await this.topologyManager.buildTree(project);
    const printableTree = tree.map(node => node.forJSON());

    console.dir(JSON.stringify(printableTree));
  }
}
