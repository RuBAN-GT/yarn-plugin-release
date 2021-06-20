import { GraphNodeJson } from '../graph.types';
import { GraphNode } from '../models/graph.node';

export function graphNodeJsonConverter(node: GraphNode): GraphNodeJson {
  const children: GraphNodeJson[] = [];
  node.children.forEach((child) => {
    children.push(graphNodeJsonConverter(child));
  });

  return { name: node.name, children };
}
