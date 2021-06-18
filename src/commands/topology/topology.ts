import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { asTree } from 'treeify';

import { TopologyManager } from '../../core/topology-manager/topology.manager';
import { topologyTreeifyConverter } from '../../core/topology-manager/utils/topology-treeify.converter';
import { TopologyOutputFormat } from './topology.types';
import { TopologyNode } from '../../core/topology-manager/models/topology.node';

export class TopologyCommand extends Command<CommandContext> {
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Generate json topological tree',
  });

  @Command.String('-o,--output-format', {
    description: `Output format, can be 'json', 'tree'`,
  })
  public outputFormat: TopologyOutputFormat = TopologyOutputFormat.tree;

  public topologyManager: TopologyManager = new TopologyManager();

  @Command.Path('release', 'tree')
  public async execute(): Promise<void> {
    this.validateInput();

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const tree = await this.topologyManager.buildTree(project);
    console.log(this.formattedOutputTree(tree));
  }

  private validateInput(): void {
    if (!Object.keys(TopologyOutputFormat).includes(this.outputFormat)) {
      throw new UsageError(`Invalid --output-format option, can be 'json', 'tree'`);
    }
  }

  private formattedOutputTree(tree: TopologyNode): string {
    switch (this.outputFormat) {
      case TopologyOutputFormat.json: {
        return JSON.stringify(tree.forJSON());
      }
      case TopologyOutputFormat.tree: {
        return asTree(topologyTreeifyConverter(tree), false, true);
      }
      default:
        return '';
    }
  }
}
