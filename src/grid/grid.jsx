import React, { useState, useEffect } from 'react';
import Node from 'grid.jsx'

const GRID_ROW_LENGTH = 10;
const GRID_COL_LENGTH = 10;

const createGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_ROW_LENGTH; row++){
        const currentRow = []
        for (let col = 0; col < GRID_COL_LENGTH; col++){
            currentRow.push(Node(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
};

const GridComponent = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const initialGrid = createGrid();
        setGrid(initialGrid);
    }, []);
}