import { IdentHash, Workspace } from '@yarnpkg/core';

export class GraphNode {
  public children: Map<IdentHash, GraphNode> = new Map();
  public chain: Set<IdentHash> = new Set();

  constructor(public workspace: Workspace, public root?: GraphNode) {
    this.chain = new Set(this.root ? this.root.chain : undefined);
    this.chain.add(workspace.anchoredLocator.identHash);
  }

  public get id(): IdentHash {
    return this.workspace.anchoredLocator.identHash;
  }

  public get name(): string {
    return this.workspace.manifest.raw.name;
  }

  public addChildren(node: GraphNode): this {
    this.children.set(node.id, node);
    return this;
  }
}
