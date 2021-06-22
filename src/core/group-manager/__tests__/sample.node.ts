import { TreeNode } from '../../workspace-tree';

export class SampleNode implements TreeNode {
  public readonly parent?: SampleNode;
  public readonly children: SampleNode[] = [];
  public readonly name: string = '';

  public addChildren(node: SampleNode): void {
    this.children.push(node);
  }
}
