import { GraphNode } from './models/graph.node';

export type GraphReport = GraphNode;

export interface GraphNodeJson {
  name: string;
  children: GraphNodeJson[];
}

export interface GraphNodeTree {
  [key: string]: GraphNodeTree;
}
