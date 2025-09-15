import {useState, useEffect, useRef} from 'react';
import Node from './node.jsx';
import Module from '../c++ logic/sim.js';
import Car from '../cars/car.jsx'

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 20;

const GridComponent = () => {
    const [grid, setGrid] = useState([]);
    const [clickedRoad, setClickedRoad] = useState([-1, -1]);
    const ModuleRef = useRef(null);
    const logicGridRef = useRef(null); 

    // Passed to Node(s) inside grid, for onClick to set & unset road status
    function handleClick({row, col}) {
        setClickedRoad([row, col]) 
    }

    // Creates the grid, filled with Node from node.jsx
    function createGrid(path=null) {

        let grid = [];
        for (let i = 0; i < GRID_ROW_LENGTH; i++){
            let row = [];
            for (let j = 0; j < GRID_COL_LENGTH; j++){
                const pathFound = path ? path.some(p => p[0] === i && p[1] === j) : false;
                row.push(<Node row={i} col={j} handleClick={handleClick} logicGridRef={logicGridRef} pathFound={pathFound}/>)
            }
            grid.push(row);
        }
        return grid;
    }

    // Converts c++ array to js array
        function vectorToArray(vector) {
        const result = [];
        const len = vector.size();
        for (let i = 0; i < len; i++) {
            result.push(vector.get(i));
        }
        return result;
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
            }

            const rawPath = Module.findPath(logicGrid, 0, 0, 6, 8);
            const path = vectorToArray(rawPath);

            console.log("Path:", rawPath);
            for(let i=0; i < rawPath.size(); i++) {
                const node = rawPath.get(i);
                console.log(`Node ${i}: x=${node[0]}, y=${node[1]}`);
            };

            setGrid(createGrid(path));
    }, [clickedRoad])

    return(
        <>
            <Car/>
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
