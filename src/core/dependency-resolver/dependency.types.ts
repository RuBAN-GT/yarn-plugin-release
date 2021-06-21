import { DependencyNode } from './models/dependency.node';

export type DependencyTree = DependencyNode;

export interface DependencyGroup {
  dependency: DependencyNode;
  dependencies: Set<DependencyNode>;
}

export interface DependencyGroups {
  groupLimit: number;
  groups: Set<DependencyGroup>;
}
