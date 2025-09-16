import {useState, useEffect, useRef} from 'react';
import Node from './node.jsx';
import Module from '../c++ logic/sim.js';
import Car from '../cars/car.jsx'

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 20;
const CELL_SIZE_REM = 3.5;

const GridComponent = () => {
    const [grid, setGrid] = useState([]);
    const [clickedRoad, setClickedRoad] = useState([-1, -1]);
    const ModuleRef = useRef(null);
    const logicGridRef = useRef(null); 
    const [cars, setCars] = useState([{ id: 1, nodeX: 0, nodeY: 0, x: 0, y: 0 , path: null, finalPos: false}]);

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

    // Sets the new position of car after each pathNode when pathFound

    async function moveCarAlongPath(car) {
        for (const pathNode of car.path) {
            while (car.nodeX !== pathNode[1]) {
                const step = car.nodeX < pathNode[1] ? 1 : -1;
                await new Promise(resolve => {
                    setCars(prevCars =>
                        prevCars.map(c =>
                            c.id === car.id
                            ? { ...c, x: c.x + step * 3.5, nodeX: c.nodeX + step }
                            : c
                        )
                    );
                    setTimeout(resolve, 300);
                });
                car.nodeX += step;
            }
            while (car.nodeY !== pathNode[0]) {
                const step = car.nodeY < pathNode[0] ? 1 : -1;
                await new Promise(resolve => {
                    setCars(prevCars =>
                        prevCars.map(c =>
                            c.id === car.id
                            ? { ...c, y: c.y + step * 3.5, nodeY: c.nodeY + step }
                            : c
                        )
                    );
                    setTimeout(resolve, 300);
                });
                car.nodeY += step;
            }
        }

        setCars(prevCars =>
            prevCars.map(c =>
            c.id === car.id ? { ...c, path: null, finalPos: true } : c
            )
        );
    }

    // Initialize ModuleRef and logicGridRef
    useEffect(() => {
        Module().then((Module) => {
            ModuleRef.current = Module;
            logicGridRef.current = new Module.Grid(GRID_ROW_LENGTH, GRID_COL_LENGTH);
        });
        setGrid(createGrid());
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

            setGrid(createGrid(path));

            if (path.length !== 0){
                setCars((prevCars) =>
                    prevCars.map(c => 
                    ({...c, path: path})
                    )
                )
            }
    }, [clickedRoad])

    // Initialize car movement if path is found
    useEffect(() => {
    for (let car of cars) {
        if (car.path !== null && !car.finalPos) {
        moveCarAlongPath(car);
        }
    }
    }, [grid]);

    return(
        <div style={{
            position: 'relative',
            width: `${GRID_COL_LENGTH * CELL_SIZE_REM}rem`,
            height: `${GRID_ROW_LENGTH * CELL_SIZE_REM}rem`,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Car cars={cars} setCars={setCars}/>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{display: 'flex'}}>
                    {row.map((node, colIndex) => (
                    <div id={`${rowIndex}:${colIndex}`} key={`${rowIndex}:${colIndex}`}>{node}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridComponent;
