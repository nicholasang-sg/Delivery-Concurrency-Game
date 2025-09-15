import {useState, useEffect, useRef} from 'react';
import Node from './node.jsx';
import Module from '../c++ logic/sim.js';

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 20;


const GridComponent = () => {
    const [grid, setGrid] = useState([]);
    const [clickedRoad, setClickedRoad] = useState([-1, -1]);
    const ModuleRef = useRef(null);     // Store the loaded Module here
    const logicGridRef = useRef(null); // Store the Grid instance here

    // Passed to Node(s) inside grid, for onClick to set & unset road status
    function handleClick({row, col}) {
        setClickedRoad([row, col]) 
    }

    // Creates the grid, filled with Node from node.jsx
    function createGrid() {

        let grid = [];
        for (let i = 0; i < GRID_ROW_LENGTH; i++){
            let row = [];
            for (let j = 0; j < GRID_COL_LENGTH; j++){
                row.push(<Node row={i} col={j} handleClick={handleClick} logicGridRef={logicGridRef}/>)
            }
            grid.push(row);
        }
        return grid;
    }

    // Initialize ModuleRef and logicGridRef
    useEffect(() => {
        Module().then((Module) => {
            ModuleRef.current = Module;
            logicGridRef.current = new Module.Grid(GRID_ROW_LENGTH, GRID_COL_LENGTH);
            setGrid(createGrid());
        });
    }, [])

    // Update visual grid and logic grid
    useEffect(() => {
            if (!logicGridRef.current || !ModuleRef.current) return;
            const Module = ModuleRef.current; 

            const logicGrid = logicGridRef.current

            if (clickedRoad[0] !== -1 && clickedRoad[1] !== -1){
                const clickedX = clickedRoad[0];
                const clickedY = clickedRoad[1];
                logicGrid.setRoad(clickedX, clickedY, !logicGrid.isRoad(clickedX, clickedY))
                console.log(clickedRoad, " status:", logicGrid.isRoad(clickedX, clickedY))
            }

            const path = Module.findPath(logicGrid, 0, 0, 1, 1);

            console.log("Path length:", path.size());
            for(let i=0; i < path.size(); i++) {
                const node = path.get(i);
                console.log(`Node ${i}: x=${node[0]}, y=${node[1]}`);
            };

            setGrid(createGrid());
    }, [clickedRoad])

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
