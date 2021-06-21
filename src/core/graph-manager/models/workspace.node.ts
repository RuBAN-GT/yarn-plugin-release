import { IdentHash, Workspace } from '@yarnpkg/core';
import { GraphNode } from './graph.node';

export class WorkspaceNode implements GraphNode<IdentHash> {
  public children: Map<IdentHash, WorkspaceNode> = new Map();
  public chain: Set<IdentHash> = new Set();

  constructor(public workspace: Workspace, public root?: WorkspaceNode) {
    this.chain = new Set(this.root ? this.root.chain : undefined);
    this.chain.add(workspace.anchoredLocator.identHash);
  }

  public get id(): IdentHash {
    return this.workspace.anchoredLocator.identHash;
  }

  public get name(): string {
    return this.workspace.manifest.raw.name;
  }

  public addChildren(node: WorkspaceNode): this {
    this.children.set(node.id, node);
    return this;
  }
}
