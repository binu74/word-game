// UpperClue.js
import React from 'react';

const styles = {
    wordBoxContainer: {
        textAlign: 'center'
    },
    wordTextArea: {
        width: '320px',
        height: '50px',
        resize: 'none',
        textAlignLast: 'center',
    }
};

function WordBox({ wordTyped }) {
    const wordArray = wordTyped.map(letter => (letter.letter));
    const word =  wordArray.join('')
    return (
        <div style={styles.wordBoxContainer}>
            <textarea readOnly value={word} style={styles.wordTextArea}></textarea>
        </div>
    );
}

export default WordBox;
