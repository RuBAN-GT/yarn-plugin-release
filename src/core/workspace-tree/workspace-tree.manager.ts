import TreeModel, { Node } from 'tree-model';

import { WorkspaceNode } from './models/workspace.node';

export class WorkspaceTreeManager {
  public readonly root: WorkspaceNode;

  protected tree: Node<WorkspaceNode>;

  constructor(root: WorkspaceNode) {
    this.root = root;
    this.tree = this.parseWorkspaceNode(root);
  }

  protected parseWorkspaceNode(rootNode: WorkspaceNode): Node<WorkspaceNode> {
    const treeManager = new TreeModel();
    return treeManager.parse(rootNode);
  }
}
