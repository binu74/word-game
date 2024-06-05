import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './styles.css';

const GameBoard = () => {
  const newBoard = [
    ['Y', 'K', 'O', 'S', 'S', 'S'],
    ['Y', 'A', 'W', 'T', 'H', 'E'],
    ['Y', 'O', 'I', 'S', 'Y', 'Y'],
    ['R', 'D', 'W', 'L', 'U', 'O'],
    ['C', 'L', 'R', 'E', 'N', 'U'],
    ['U', 'E', 'E', 'T', 'L', 'F'],
    ['O', 'T', 'E', 'T', 'O', 'R'],
    ['P', 'O', 'L', 'R', 'W', 'E']
  ];

  const [board, setBoard] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [formedWord, setFormedWord] = useState('');
  const [targetWords] = useState(['OKAYYY', 'YESSS', 'SUNFLOWER', 'LETTERLOOP', 'WORDLE', 'CUTERWITHYOU']);
  const [foundWords, setFoundWords] = useState([]);
  const [foundWordCells, setFoundWordCells] = useState({});

  useEffect(() => {
    setBoard(newBoard);
  }, []);

  const handleCellClick = (row, col) => {
    const cellIndex = selectedCells.findIndex(cell => cell.row === row && cell.col === col);

    if (cellIndex !== -1) {
      // Deselect the cell
      const newSelectedCells = selectedCells.filter(cell => !(cell.row === row && cell.col === col));
      setSelectedCells(newSelectedCells);
      setFormedWord(newSelectedCells.map(cell => board[cell.row][cell.col]).join(''));
    } else {
      if (selectedCells.length === 0) {
        setSelectedCells([{ row, col }]);
        setFormedWord(board[row][col]);
      } else {
        const lastSelected = selectedCells[selectedCells.length - 1];
        if (
          (Math.abs(lastSelected.row - row) <= 1 && Math.abs(lastSelected.col - col) <= 1)
        ) {
          const newSelectedCells = [...selectedCells, { row, col }];
          setSelectedCells(newSelectedCells);
          setFormedWord(newSelectedCells.map(cell => board[cell.row][cell.col]).join(''));
        }
      }
    }
  };

  const handleSubmit = () => {
    if (targetWords.includes(formedWord)) {
      const newFoundWords = [...foundWords, formedWord];
      setFoundWords(newFoundWords);
      const newFoundWordCells = { ...foundWordCells };

      selectedCells.forEach(cell => {
        newFoundWordCells[`${cell.row}-${cell.col}`] = formedWord;
      });

      setFoundWordCells(newFoundWordCells);

      // Clear selected cells and formed word if matched
      setSelectedCells([]);
      setFormedWord('');

      // Check if all target words have been found
      if (newFoundWords.length === targetWords.length) {
        setTimeout(() => {
          alert('Congratulations! You have found all the words!');
        }, 100);
      }
    } else {
      // Clear selected cells and formed word if not matched
      setSelectedCells([]);
      setFormedWord('');
    }
  };

  const getCellClass = (row, col) => {
    const isSelected = selectedCells.some(cell => cell.row === row && cell.col === col);
    const cellKey = `${row}-${col}`;
    const foundWord = foundWordCells[cellKey];

    if (foundWord) {
      if (foundWord === targetWords[targetWords.length - 1]) {
        return 'cell last-found';
      }
      return 'cell found';
    }

    if (isSelected) {
      return 'cell selected';
    }

    return 'cell';
  };

  const allWordsFound = foundWords.length === targetWords.length;

  return (
    <div className="game-board-container">
      <div className="game-board">
        <h1>STRANDS FOR YOU</h1>
        <div className="theme-section">
          <div className="theme-title">Today's Theme</div>
          <div className="theme-description"><b>I SEEE</b></div>
        </div>
        <textarea value={formedWord} readOnly className="word-display" />
        <div className="words-found-display">
          {`${foundWords.length} of ${targetWords.length} theme words found`}
        </div>
        <div className="grid-and-words-container">
          <div className="game-grid">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((letter, colIndex) => (
                  <Cell
                    key={colIndex}
                    letter={letter}
                    row={rowIndex}
                    col={colIndex}
                    cellClass={allWordsFound && foundWords.length === targetWords.length ? 
                      (foundWordCells[`${rowIndex}-${colIndex}`] === targetWords[targetWords.length - 1] ? 'cell last-found' : 'cell found') : 
                      getCellClass(rowIndex, colIndex)
                    }
                    onClick={handleCellClick}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="words-found-container">
            <div className="words-found-title">Words Found:</div>
            <ul className="words-found-list">
              {foundWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default GameBoard;
