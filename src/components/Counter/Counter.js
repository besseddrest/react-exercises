import { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleButtonClick = (isIncrement) => {
    return isIncrement ? setCounter(counter + 1) : setCounter(counter - 1);
  }

  return (
    <>
      <h1>Counter Exercise</h1>
      <h2>{ counter }</h2>
      <div>
        <button onClick={() => handleButtonClick(true)}>Increment</button>
        <button onClick={() => handleButtonClick(false)}>Decrement</button>
      </div>
    </>
  );
}

export default Counter;