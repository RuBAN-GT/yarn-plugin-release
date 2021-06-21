import { GraphNode } from '../models/graph.node';

export type AffectedNodes<T> = Set<Set<T>>;

export function takeAffectedNodes<T>(rootNode: GraphNode<T>, ids: Set<T>): AffectedNodes<T> {
  return new Set();
}
