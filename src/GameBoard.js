import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './styles.css';

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Congratulations and Celebrations!! 🥳🎉</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

const GameBoard = () => {
  const newBoard = [
    ['E', 'O', 'W', 'Y', 'E', 'S'],
    ['L', 'R', 'Y', 'T', 'H', 'S'],
    ['D', 'Y', 'I', 'S', 'Y', 'S'],
    ['Y', 'A', 'W', 'U', 'L', 'O'],
    ['C', 'K', 'R', 'N', 'E', 'U'],
    ['U', 'O', 'E', 'F', 'T', 'T'],
    ['R', 'T', 'L', 'O', 'P', 'E'],
    ['E', 'W', 'O', 'O', 'L', 'R']
  ];

  const [board, setBoard] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [formedWord, setFormedWord] = useState('');
  const [targetWords] = useState(['OKAYYY', 'YESSS', 'SUNFLOWER', 'LETTERLOOP', 'WORDLE', 'CUTERWITHYOU']);
  const [foundWords, setFoundWords] = useState([]);
  const [foundWordCells, setFoundWordCells] = useState({});
  const [showModal, setShowModal] = useState(false);

  const wordDescriptions = {
    OKAYYY: "We said ok/okay/okayy/okayyy 14 times a day, with 'okayyy' being the most popular!",
    YESSS: "We said yes/yess/yesss/yessss almost 4 times a day!",
    SUNFLOWER: "Sunday ho ya Monday, we started our day with 🌻",
    WORDLE: "The math is settled... TTACE—oops, TRACE is the way to go!",
    LETTERLOOP: "Two words, one loop, and two shared letters: U & I",
    CUTERWITHYOU: "Self-explanatory 😋 #cuterwithyou"
  };

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
        setShowModal(true);
      }
      // if (newFoundWords.length === targetWords.length) {
      //   setTimeout(() => {
      //     alert('Congratulations and Celebrations!! 🥳🎉');
      //   }, 100);
      // }
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
        <h1>Strands Special Edition: Jun 17, 2024</h1>
        <div className="theme-section">
          <div className="theme-title">TODAY'S THEME</div>
          <div className="theme-description"><b>Way to grow!</b></div>
        </div>
        <textarea value={formedWord} readOnly className="word-display" />
        <div className="words-found-display">
          {`${foundWords.length} of ${targetWords.length} theme words found`}
        </div>
        <div className="main-content">
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
            <h2 className="words-found-title">Found Words</h2>
            <ol>
              {foundWords.map((word, index) => (
                <li key={index}>
                  <b>{word}</b>
                  <ul>
                    <li>{wordDescriptions[word]}</li>
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default GameBoard;
