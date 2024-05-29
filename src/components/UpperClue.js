// UpperClue.js
import React from 'react';

const styles = {
  clueContainer: {
    textAlign: 'center',
  },
};

function UpperClue({ clue }) {
  return (
    <div style={styles.clueContainer}>
      <p>{clue}</p>
    </div>
  );
}

export default UpperClue;
