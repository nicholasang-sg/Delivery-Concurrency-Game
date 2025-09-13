import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CarSprite from './components/carsprite.jsx'
import GridComponent from './grid/grid.jsx' 
import Node from './grid/node.jsx' 
import './App.css'

import Module from './c++ logic/sim.js';


function App() {

  useEffect(() => {
    Module().then((Module) => {
      const result = Module._add(1, 2);
      console.log("WASM result:", result);

      const counter = new Module.Counter();
      counter.inc();
      counter.inc();
      console.log("Counter value:", counter.get()); 

      const grid = new Module.Grid(10, 10);

      console.log("grid: ", grid);

      for(let x=0; x<=7; x++) grid.setRoad(x, 0, true);
      for(let y=0; y<=8; y++) grid.setRoad(7, y, true);

      const path = Module.findPath(grid, 0, 0, 7, 8);

      console.log("Path length:", path.size());
      for(let i=0; i < path.size(); i++) {
        const node = path.get(i);
        console.log(`Node ${i}: x=${node.first}, y=${node.second}`);
      }
    });
  }, []);


  const [count, setCount] = useState(0);

  return (
    <>
      <GridComponent/>
      <CarSprite/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
