struct Node {
    int x, y;
    float cost;
    float heuristic;
    Node* parent;

    float totalCost() const { return cost + heuristic; }
};

// Priority queue comparison
struct CompareNode {
    bool operator()(Node* a, Node* b) {
        return a->totalCost() > b->totalCost();
    }
};