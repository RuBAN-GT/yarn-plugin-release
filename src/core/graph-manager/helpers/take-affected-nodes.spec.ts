import { GraphNode } from '../models/graph.node';
import { takeAffectedNodes } from './take-affected-nodes';

class SampleNode implements GraphNode<string> {
  public children: Map<string, SampleNode> = new Map();
  public chain: Set<string> = new Set();
  public root!: SampleNode;

  constructor(public readonly id: string) {
    this.generateChain();
  }

  public addChildren(node: SampleNode): this {
    node.setRoot(node);
    this.children.set(node.id, node);
    return this;
  }

  private setRoot(root: SampleNode): void {
    this.root = root;
    this.generateChain();
  }

  private generateChain(): void {
    this.chain = new Set(this.root ? this.root.chain : undefined);
    this.chain.add(this.id);
  }
}

describe('takeAffectedNodes', () => {
  it(`returns empty set if sample doesn't have ids`, () => {
    const sample = new SampleNode('a');
    sample.addChildren(new SampleNode('b'));

    const result = takeAffectedNodes(sample, new Set(['c']));
    expect(result.size).toBe(0);
  });

  it('returns nodes for combination [a.b.c, a.d, a.e.b]', () => {
    const a = new SampleNode('a');
    const ab = new SampleNode('b');
    const abc = new SampleNode('c');
    a.addChildren(ab);
    ab.addChildren(abc);

    const ad = new SampleNode('d');
    a.addChildren(ad);

    const e = new SampleNode('e');
    const eb = new SampleNode('b');
    a.addChildren(e);
    e.addChildren(eb);

    const result: Set<any> = takeAffectedNodes(a, new Set(['b']));
    expect(result.size).toBe(1);

    const chain = [...result][0];
    expect([...chain]).toContain(['a', 'e', 'b']);
    expect([...chain]).toContain(['a', 'b', 'c']);
  });
});
