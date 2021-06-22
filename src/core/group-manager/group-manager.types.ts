import { TreeNode } from '../workspace-tree';

export interface GroupManagerProps {
  groupBy: number;
  input: TreeNode[];
}

export interface NodeGroupsReport {
  groupBy: number;
  groups: TreeNode[];
}
