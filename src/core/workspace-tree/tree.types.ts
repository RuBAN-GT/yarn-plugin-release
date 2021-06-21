export interface TreeNode {
  parent?: TreeNode;
  name: string;
  children: TreeNode[];
}

export interface TreeNodeJson {
  name: string;
  children: TreeNodeJson[];
}

export interface SimpleTreeNode {
  [key: string]: SimpleTreeNode;
}
