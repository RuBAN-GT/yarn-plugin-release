export interface DependencyNode {
  id: string;
  children: Map<string, DependencyNode>;
}
