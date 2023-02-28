import { useEffect, useState, useRef } from 'react';
import Tile from './Tile';
import './wordle.scss';

const ANSWER = "QUEST";

// instead of grid (table), keep single array of 25 letters
// css/flexbox used to imitate 5 rows - flexbox/5-up
// every 5th letter (+submit) last 5 in array are compared against answer
// if letter doesn't appear in answer, grey
// if letter in wrong place, yellow
// - if additional letter, grey
// if correct position, green
// consider:
// - delete
// - error if not % 5 = 0
// - (extra) error if not actual word (need to compare against list of possible answers)
// keep record of tries (submits)
// after 5th submit game over or win

export default function Board() {
  const [typed, setTyped] = useState(Array(25).fill({
    value: '',
    isCorrect: false,
    isPresent: false,
  }));
  const [submission, setSubmission] = useState('');
  const [didSubmit, setDidSubmit] = useState(true);
  const letterCount = useRef(0);
  const [correctCount, setCorrectCount] = useState(0); // ToDo: clear board
  const [didWin, setDidWin] = useState(false);


  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [typed, didSubmit]);

  const handleKeyPress = (ev) => {
    // ToDo: handle Enter and Delete
    if ((ev.keyCode >= 65 && ev.keyCode <= 90) || (ev.keyCode >= 97 && ev.keyCode <= 122)) {
      if (letterCount.current < 5 && didSubmit == true) {
        letterCount.current++;
        addLetter(ev.key.toUpperCase());
      }
    }
  }

  const addLetter = (val) => {
    const temp = typed.slice();
    const emptyIndex = temp.findIndex(item => item.value == '');
    temp[emptyIndex] = {
      value: val,
      isCorrect: false,
      isPreset: false,
    };
    setTyped(temp);
  }

  const handleSubmit = () => {
    letterCount.current = 0;
    setDidSubmit(false);
    checkSubmission();
    setDidSubmit(true);
  }

  const checkSubmission = () => {
    const firstEmpty = typed.findIndex(item => item.value == '');
    const temp = typed.slice(0, firstEmpty);
    let submissionIndex = firstEmpty - 5;
    const answerArr = ANSWER.split('');
    let answerIndex = 0;
    let correctCount = 0;

    for (let i = submissionIndex; i < temp.length; i++) {
      if (temp[i].value == answerArr[answerIndex]) {
        temp[i].isCorrect = true;
        correctCount++;
      } else {
        if (ANSWER.indexOf(temp[i].value) > -1) temp[i].isPresent = true;
      }
      answerIndex++;
    }
    
    const remainder = 25 - temp.length;
    setTyped(temp.concat(Array(remainder).fill({
      value: '',
      isCorrect: false,
      isPresent: false,
    })));
    
    if (correctCount == 5) {
      setDidWin(true);
    } else {
      setCorrectCount(0);
    }
  }

  return (
    <>
      {
        didWin ? <div className="overlay--win">You Win!</div> : null
      }
      <div className="word__board">
        {
          typed.map((entry, i) => <Tile key={i} entry={entry} />)
        }
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}