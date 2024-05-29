// BottomClue.js
import React from 'react';

const styles = {
  clueContainer: {
    textAlign: 'center',
  },
};

function BottomClue({ clue }) {
  return (
    <div style={styles.clueContainer}>
      <p>{clue}</p>
    </div>
  );
}

export default BottomClue;
