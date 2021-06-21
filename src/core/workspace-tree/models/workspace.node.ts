import { IdentHash, Workspace } from '@yarnpkg/core';

import { TreeNode } from '../tree.types';

export class WorkspaceNode implements TreeNode {
  public readonly parent?: WorkspaceNode;
  public readonly children: WorkspaceNode[] = [];
  public readonly workspace: Workspace;

  protected _chain: Set<IdentHash> = new Set();

  constructor(workspace: Workspace, parent?: WorkspaceNode) {
    this.parent = parent;
    this.workspace = workspace;

    this.generateChain();
  }

  public get chain(): Set<IdentHash> {
    return this._chain;
  }

  public get id(): IdentHash {
    return this.workspace.anchoredLocator.identHash;
  }

  public get name(): string {
    return this.workspace.manifest.raw.name;
  }

  public addChildren(node: WorkspaceNode): void {
    this.children.push(node);
  }

  protected generateChain(): void {
    this._chain = new Set(this.parent?.chain);
    this._chain.add(this.id);
  }
}
