#include <iostream> 
#include <vector>
#include <queue>
#include <unordered_set>
#include <cmath>
#include "grid.h"
#include "node.h"

std::vector<std::pair<int, int>> findPath(Grid& grid, int sx, int sy, int ex, int ey) {
    std::priority_queue<Node*, std::vector<Node*>, CompareNode> openSet;
    std::unordered_set<int> visited;

    auto index = [&](int x, int y) { return y * grid.width + x; };

    Node* start = new Node{sx, sy, 0, (float) std::abs(ex - sx) + std::abs(ey - sy), nullptr};
    openSet.push(start);

    while (!openSet.empty()) {
        Node* current = openSet.top();
        openSet.pop();

        if (current->x == ex && current->y == ey) {
            // Reconstruct path
            std::vector<std::pair<int, int>> path;
            for (Node* n = current; n != nullptr; n = n->parent)
                path.push_back({n->x, n->y});
            std::reverse(path.begin(), path.end());
            return path;
        }

        if (visited.count(index(current->x, current->y)))
            continue;
        visited.insert(index(current->x, current->y));

        for (auto [dx, dy] : std::vector<std::pair<int, int>>{{1,0},{-1,0},{0,1},{0,-1}}) {
            int nx = current->x + dx;
            int ny = current->y + dy;

            if (!grid.inBounds(nx, ny)) continue;
            if (!grid.isRoad(nx, ny)) continue;

            float speedMod = grid.getCell(nx, ny).speedModifier;
            float cost = current->cost + 1.0f * speedMod;
            float heuristic = std::abs(ex - nx) + std::abs(ey - ny);

            Node* neighbor = new Node{nx, ny, cost, heuristic, current};
            openSet.push(neighbor);
        }
    }

    return {}; // No path found
}
