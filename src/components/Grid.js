import React from 'react';
import './Grid.css';

const Grid = ({ letters, onClick, gridColors }) => {
  return (
    <div className="grid">
      {letters.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((letter, colIndex) => (
            <div 
              className={`cell ${gridColors[rowIndex][colIndex]}`} 
              key={colIndex} 
              onClick={() => onClick(rowIndex, colIndex, letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
