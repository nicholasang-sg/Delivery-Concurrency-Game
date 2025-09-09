#include <iostream>
#include <vector> 

enum CellType {
    EMPTY,
    ROAD
};

struct GridCell {
    CellType type = EMPTY;
    bool occupied = false; // If a car is currently here
    float speedModifier = 1.0f; // Used to slow down cars dynamically
};

class Grid {
public:
    int width;
    int height;
    std::vector<GridCell> cells;

    Grid(int w, int h) : width(w), height(h), cells(w * h) {}

    GridCell& getCell(int x, int y) {
        return cells[y * width + x];
    }

    bool isRoad(int x, int y) {
        return getCell(x, y).type == ROAD;
    }

    void setRoad(int x, int y, bool isRoad) {
        getCell(x, y).type = isRoad ? ROAD : EMPTY;
    }

    bool inBounds(int x, int y) {
        return x >= 0 && y >= 0 && x < width && y < height;
    }
};