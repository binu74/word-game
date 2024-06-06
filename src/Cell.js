import React from 'react';
import './styles.css';

const Cell = ({ letter, row, col, cellClass, onClick }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  return (
    <div className={cellClass} onClick={handleClick}>
      {letter}
    </div>
  );
};

export default Cell;
