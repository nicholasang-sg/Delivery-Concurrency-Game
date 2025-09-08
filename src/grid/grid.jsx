import {useState, useEffect} from 'react';
import Node from './node.jsx';

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 10;

const createGrid = () => {
    let grid = [];
    for (let i = 0; i < GRID_ROW_LENGTH; i++){
        let row = []
        for (let j = 0; j < GRID_COL_LENGTH; j++){
            row.push(<Node/>)
        }
        grid.push(row);
    }
    return grid;
}


const GridComponent = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const newGrid = createGrid()
        setGrid(newGrid);
    }, [])

    return(
        <>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((node, colIndex) => (
                    <div key={colIndex}>{node}</div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default GridComponent;
