import { TreeObject } from 'treeify';

import { TopologyNode } from '../models/topology.node';

export function topologyTreeifyConverter(root: TopologyNode): TreeObject {
  return { [root.name]: simplifyNode(root) };
}

function simplifyNode(node: TopologyNode): any {
  if (node.children.size === 0) {
    return null;
  }

  const childNode: Record<string, any> = {};
  node.children.forEach((child) => {
    childNode[child.name] = simplifyNode(child)
  });

  return childNode;
}
