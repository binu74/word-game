import React, { useState } from 'react';
import Grid from './components/Grid';
import ClueBox from './components/ClueBox';
import WordBox from './components/WordBox';
import './App.css';

const predefinedGrid = [
  ['Y', 'K', 'O', 'S', 'S', 'S'],
  ['Y', 'A', 'W', 'T', 'H', 'E'],
  ['Y', 'O', 'I', 'S', 'Y', 'Y'],
  ['R', 'D', 'W', 'L', 'U', 'O'],
  ['C', 'L', 'R', 'E', 'N', 'U'],
  ['U', 'E', 'E', 'T', 'L', 'F'],
  ['O', 'T', 'E', 'T', 'O', 'R'],
  ['P', 'O', 'L', 'R', 'W', 'E']
];

const targetWord = 'CUTERWITHYOU';
const targetPositions = [
  { row: 4, col: 0 }, // C
  { row: 5, col: 0 }, // U
  { row: 6, col: 1 }, // T
  { row: 5, col: 2 }, // E
  { row: 4, col: 2 }, // R
  { row: 3, col: 2 }, // W
  { row: 2, col: 2 }, // I
  { row: 1, col: 3 }, // T
  { row: 1, col: 4 }, // H
  { row: 2, col: 4 }, // Y
  { row: 3, col: 5 }, // O
  { row: 4, col: 5 }  // U
];

const targetWord2 = 'OKAYYY';
const targetPositions2 = [
  { row: 0, col: 1 }, // O
  { row: 1, col: 1 }, // K
  { row: 2, col: 1 }, // A
  { row: 3, col: 1 }, // Y
  { row: 4, col: 1 }, // Y
  { row: 5, col: 1 }, // Y
];

// Define specific colors for specific positions
const specialColors = {
  '0-0': 'yellow', '3-0': 'red', '0-4': 'yellow',
  '1-0': 'yellow', '2-1': 'red', '3-4': 'yellow',
  '0-1': 'yellow', '3-1': 'red', '4-4': 'yellow',
  '2-0': 'yellow', '4-1': 'red', '5-4': 'yellow',
  '6-0': 'yellow', '5-1': 'red', '6-4': 'yellow',
  '7-0': 'yellow', '1-2': 'red', '7-4': 'yellow',
  '1-1': 'yellow', '0-3': 'red', '0-5': 'yellow',
  '7-1': 'yellow', '2-3': 'red', '1-5': 'yellow',
  '0-2': 'yellow', '2-5': 'yellow',
  '6-2': 'yellow', '5-5': 'yellow',
  '7-2': 'yellow', '6-5': 'yellow',
  '3-3': 'yellow', '7-5': 'yellow',
  '4-3': 'yellow',
  '5-3': 'yellow',
  '6-3': 'yellow',
  '7-3': 'yellow',
};

const App = () => {
  const [clickedLetters, setClickedLetters] = useState([]);
  const [gridColors, setGridColors] = useState(Array(8).fill(null).map(() => Array(6).fill('')));
  const [message, setMessage] = useState('');
  const [lines, setLines] = useState([]);

  const handleClick = (row, col, letter) => {
    // Clicking on the same letter, row and col again
    const clicked = clickedLetters.filter(clicked => {
      if (clicked.row == row && clicked.col == col && clicked.letter == letter) {
        return true;
      }
      return false;
    })
    
    if (!clicked.length) {
      const newClickedLetters = [...clickedLetters, { row, col, letter }];
      setClickedLetters(newClickedLetters);
      const newGridColors = gridColors.map((rowColors, rIdx) =>
        rowColors.map((color, cIdx) => {
          if (rIdx === row && cIdx === col) {
            const positionKey = `${rIdx}-${cIdx}`;
            return specialColors[positionKey] || 'correct'; // Use special color if defined, otherwise 'correct'
          }
          return color;
        })
      );
      setGridColors(newGridColors);

      // Check if the clicked sequence matches the target word
      const targetSequence = newClickedLetters.map(({ row, col }) => `${row}-${col}`);
      const isTargetWordCorrect = targetPositions.every(({ row, col }, index) =>
        `${row}-${col}` === targetSequence[index] &&
        newClickedLetters[index].letter.toUpperCase() === targetWord[index]
      );

      if (isTargetWordCorrect) {
        setMessage('You won!');
      }

      // Check if the clicked sequence matches the second target word
      const isSecondWordFound = targetPositions2.every(({ row, col }, index) =>
        `${row}-${col}` === targetSequence[index] &&
        newClickedLetters[index].letter.toUpperCase() === targetWord2[index]
      );

      if (isSecondWordFound) {
        setMessage('REMEMBER ME');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const handleSubmit = () => {
    const selectedWord = clickedLetters.map(({ letter }) => letter.toUpperCase()).join('');
    if (selectedWord === targetWord) {
      setMessage('You won!');
    } else {
      setMessage('Try again!');
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000); // Delay to show the message before refreshing
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Word Game</h1>
        <ClueBox upperClue="TODAY'S THEME" bottomClue="I SEEE" />
        <Grid
          letters={predefinedGrid}
          clickedLetters={clickedLetters}
          onClick={handleClick}
          gridColors={gridColors}
        />
        <div className="message">{message}</div>
        <WordBox wordTyped={clickedLetters} />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
