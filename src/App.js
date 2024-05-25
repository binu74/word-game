import React, { useState } from 'react';
import Grid from './Grid';
import ClueBox from './ClueBox';
import './App.css';

const predefinedGrid = [
  ['Y', 'K', 'O', 'S', 'S', 'S'],
  ['y', 'A', 'W', 'T', 'H', 'E'],
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

const App = () => {
  const [clickedLetters, setClickedLetters] = useState([]);
  const [gridColors, setGridColors] = useState(Array(8).fill(null).map(() => Array(6).fill('')));

  const handleClick = (row, col, letter) => {
    const newClickedLetters = [...clickedLetters, { row, col, letter }];
    setClickedLetters(newClickedLetters);

    const isPartOfTargetWord = targetPositions.some((pos, index) => {
      return (
        pos.row === row &&
        pos.col === col &&
        letter.toUpperCase() === targetWord[index]
      );
    });

    const newGridColors = gridColors.map((rowColors, rIdx) => 
      rowColors.map((color, cIdx) => 
        (rIdx === row && cIdx === col) 
          ? isPartOfTargetWord 
            ? 'correct' 
            : 'incorrect' 
          : color
      )
    );
    setGridColors(newGridColors);

    if (newClickedLetters.length === targetWord.length) {
      console.log('Clicked:', newClickedLetters);

      const isCorrect = newClickedLetters.every((pos, index) => {
        console.log(
          `Comparing clicked (${pos.row},${pos.col}): ${pos.letter.toUpperCase()}`
          + ` with target (${targetPositions[index].row},${targetPositions[index].col}): `
          + `${targetWord[index]}`
        );
        return (
          pos.row === targetPositions[index].row &&
          pos.col === targetPositions[index].col &&
          pos.letter.toUpperCase() === targetWord[index]
        );
      });

      console.log('Is Correct:', isCorrect);

      if (isCorrect) {
        alert('Correct! You found the word "CUTERWITHYOU"!');
      } else {
        alert('Incorrect sequence. Try again!');
      }
      setClickedLetters([]); // Reset for the next attempt
      setGridColors(Array(8).fill(null).map(() => Array(6).fill(''))); // Reset colors for the next attempt
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Word Game</h1>
        <ClueBox upperClue="TODAY'S THEME" bottomClue="I SEE" />
        <Grid 
          letters={predefinedGrid} 
          clickedLetters={clickedLetters} 
          onClick={handleClick} 
          gridColors={gridColors}
        />
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default App;
