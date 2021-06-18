import { TreeObject } from 'treeify';

import { TopologyNode } from '../models/topology.node';

function simplifyNode(node: TopologyNode): any {
  if (node.children.size === 0) {
    return null;
  }

  const childNode: Record<string, any> = {};
  node.children.forEach((child) => {
    childNode[child.name] = simplifyNode(child);
  });

  return childNode;
}

export function topologyTreeifyConverter(root: TopologyNode): TreeObject {
  return { [root.name]: simplifyNode(root) };
}
