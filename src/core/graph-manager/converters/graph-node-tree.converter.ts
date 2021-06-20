import { GraphNodeTree } from '../graph.types';
import { GraphNode } from '../models/graph.node';

function generateNodeTree(node: GraphNode): GraphNodeTree {
  const children: any = node.children.size > 0 ? {} : null;
  node.children.forEach((value) => {
    children[value.name] = generateNodeTree(value);
  });

  return children;
}

export function graphNodeTreeConverter(node: GraphNode): GraphNodeTree {
  return { [node.name]: generateNodeTree(node) };
}
