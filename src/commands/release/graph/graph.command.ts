import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage, UsageError } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { asTree } from 'treeify';

import { GraphOutputFormat } from './graph.types';
import { GraphManager, GraphNode, graphNodeJsonConverter, graphNodeTreeConverter } from '../../../core/graph-manager';

export class GraphCommand extends Command<CommandContext> {
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Generates tree',
  });

  @Command.String('-o,--output-format', {
    description: `Output format, can be 'json', 'tree'`,
  })
  public outputFormat: GraphOutputFormat = GraphOutputFormat.tree;

  public graphManager: GraphManager = new GraphManager();

  @Command.Path('release', 'tree')
  public async execute(): Promise<void> {
    this.validateInput();

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const rootNode = await this.graphManager.buildGraph(project);
    console.log(this.formattedOutputTree(rootNode));
  }

  private validateInput(): void {
    if (!Object.keys(GraphOutputFormat).includes(this.outputFormat)) {
      throw new UsageError(`Invalid --output-format option, can be 'json', 'tree'`);
    }
  }

  private formattedOutputTree(node: GraphNode): string {
    switch (this.outputFormat) {
      case GraphOutputFormat.json: {
        return JSON.stringify(graphNodeJsonConverter(node));
      }
      case GraphOutputFormat.tree: {
        return asTree(graphNodeTreeConverter(node), false, true);
      }
      default:
        return '';
    }
  }
}
