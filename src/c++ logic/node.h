struct Node {
    int x, y;
    float cost;
    float heuristic;
    Node* parent;

    float totalCost() const { return cost + heuristic; }
};

struct CompareNode {
    bool operator()(Node* a, Node* b) {
        return a->totalCost() > b->totalCost();
    }
};

Node* getParent(Node& node) {
    return node.parent;
}

void setParent(Node& node, Node* p) {
    node.parent = p;
}