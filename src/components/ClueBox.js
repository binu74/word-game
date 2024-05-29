// ClueBox.js
import React from 'react';
import UpperClue from './UpperClue';
import BottomClue from './BottomClue';

const styles = {
  container: {
    width: '300px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
  },
  separationLine: {
    borderTop: '1px solid #ccc',
    margin: '10px 0',
  },
};

function ClueBox({ upperClue, bottomClue }) {
  return (
    <div style={styles.container}>
      <UpperClue clue={upperClue} />
      <div style={styles.separationLine}></div>
      <BottomClue clue={bottomClue} />
    </div>
  );
}

export default ClueBox;
