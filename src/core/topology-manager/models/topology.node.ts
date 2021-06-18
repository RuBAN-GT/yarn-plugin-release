import { LocatorHash, Workspace } from '@yarnpkg/core';

export class TopologyNode {
  public children: Set<TopologyNode> = new Set();
  public history: Set<LocatorHash> = new Set();

  constructor(public workspace: Workspace, rootHistory: Set<LocatorHash> = new Set()) {
    this.history = new Set(rootHistory);
    this.history.add(workspace.locator.locatorHash);
  }

  public get name(): string {
    return this.workspace.manifest.raw.name;
  }

  public forJSON(): any {
    return {
      name: this.name,
      children: [...this.children].map((node) => node.forJSON()),
    };
  }
}
