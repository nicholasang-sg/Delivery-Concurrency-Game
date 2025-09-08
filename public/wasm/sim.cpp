#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

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

EMSCRIPTEN_BINDINGS(my_mod) {
  emscripten::class_<Counter>("Counter")
    .constructor<>()
    .function("inc", &Counter::inc)
    .function("get", &Counter::get);
}