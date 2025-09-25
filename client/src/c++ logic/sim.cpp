#include <emscripten.h>
#include <emscripten/bind.h>
#include "pathfinding.h"

using namespace emscripten;

// emcc sim.cpp -o sim.js --bind -std=c++17 -s MODULARIZE=1 -s EXPORT_ES6=1
// (activate .sh or .ps1, and run this command to convert c++ to wasm and js)

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int add(int a, int b) {
    return a + b;
  }
}

class Counter {
  int value = 0;
public:
  void inc() { value++; }
  int get() { return value; }
};

typedef std::pair<int, int> IntPair;
typedef std::vector<IntPair> Path;

EMSCRIPTEN_BINDINGS(createModule) {
  // Bind the pair
  value_array<IntPair>("IntPair")
    .element(&IntPair::first)
    .element(&IntPair::second);

  // Bind the vector of pairs
  register_vector<IntPair>("VectorIntPair");

  emscripten::class_<Counter>("Counter")
    .constructor<>()
    .function("inc", &Counter::inc)
    .function("get", &Counter::get);

    // Bind CellType
  enum_<CellType>("CellType")
    .value("EMPTY", EMPTY)
    .value("ROAD", ROAD);

  // Bind GridCell
  value_object<GridCell>("GridCell")
    .field("type", &GridCell::type)
    .field("occupied", &GridCell::occupied)
    .field("speedModifier", &GridCell::speedModifier);

  register_vector<GridCell>("VectorGridCell");

  // Bind Grid
  class_<Grid>("Grid")
    .constructor<int, int>()
    .property("width", &Grid::width)
    .property("height", &Grid::height)
    .function("getCell", &Grid::getCell, allow_raw_pointers())
    .function("isRoad", &Grid::isRoad)
    .function("setRoad", &Grid::setRoad)
    .function("inBounds", &Grid::inBounds);
    
  // Bind findPath function
  emscripten::function("findPath", &findPath);

  class_<Node>("Node")
    .constructor<>()
    .property("x", &Node::x)
    .property("y", &Node::y)
    .property("cost", &Node::cost)
    .property("heuristic", &Node::heuristic)
    .function("totalCost", &Node::totalCost)
    .function("getParent", &getParent, allow_raw_pointers())
    .function("setParent", &setParent, allow_raw_pointers());

  class_<CompareNode>("CompareNode")
    .constructor<>()
    .function("compare", &CompareNode::operator(), allow_raw_pointers());
}