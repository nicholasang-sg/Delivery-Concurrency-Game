import {useState, useEffect} from 'react';
import Node from './node.jsx';
import Module from '../c++ logic/sim.js';

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 20;

function createGrid() {

    let grid = [];
    for (let i = 0; i < GRID_ROW_LENGTH; i++){
        let row = []
        for (let j = 0; j < GRID_COL_LENGTH; j++){
            row.push(<Node row={i} col={j}/>)
        }
        grid.push(row);
    }
    return grid;
}


const GridComponent = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        Module().then((Module) => {
            const grid = new Module.Grid(10, 10);

            console.log("grid: ", grid);

            for(let x=0; x<=7; x++) grid.setRoad(x, 0, true);
            for(let y=0; y<=8; y++) grid.setRoad(7, y, true);

            const path = Module.findPath(grid, 0, 0, 7, 8);

            console.log("Path length:", path.size());
            for(let i=0; i < path.size(); i++) {
                const node = path.get(i);
                console.log(`Node ${i}: x=${node[0]}, y=${node[1]}`);
            }
        });

        const newGrid = createGrid()
        setGrid(newGrid);
    }, [])

    return(
        <>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center'}}>
                    {row.map((node, colIndex) => (
                    <div key={`${rowIndex}:${colIndex}`}>{node}</div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default GridComponent;
