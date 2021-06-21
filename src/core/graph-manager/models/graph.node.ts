export interface GraphNode<Id = any> {
  id: Id;
  root?: GraphNode<Id>;
  children: Map<Id, GraphNode<Id>>;
  chain: Set<Id>;
}
