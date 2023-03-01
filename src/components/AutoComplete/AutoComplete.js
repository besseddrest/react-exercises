import './autocomplete.scss';
import { nameArr } from './autocomplete-data';
import { useRef, useState } from 'react';

export default function AutoComplete() {
  const [names, setNames] = useState(nameArr);
  const [prevLength, setPrevLength] = useState(0);
  const defaultNames = useRef([...nameArr]);
  const inputRef = useRef();
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChange = () => {
    const inputVal = inputRef.current.value.toUpperCase();
    let filteredNames;

    if (inputVal.length > prevLength) {
      filteredNames = filterNames(inputVal, names.slice());
      setPrevLength(prevLength + 1);
    } else {
      filteredNames = filterNames(inputVal, defaultNames.current);
      setPrevLength(prevLength - 1);
    }

    setShowOptions(true);
    setNames(filteredNames);
  };

  const filterNames = (val, arr) => {
    const filtered = arr.slice().filter(name => {
      const upperCaseName = name.toUpperCase();
      if (upperCaseName.indexOf(val) > -1) {
        return name;
      }
    });

    return filtered;
  }

  const handleOnClick = (ev) => {
    inputRef.current.value = ev.target.innerText;
    setShowOptions(false);
  }

  const debounce = (fn, timeout) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fn.apply(args), timeout);
    }
  }

  return (
    <div className="autocomplete__wrapper">
      <input onChange={ debounce(() => handleOnChange, 300) } className="autocomplete__input" type="text" ref={inputRef} />
      <ul onClick={handleOnClick} className={"autocomplete__list" + ( showOptions == false ? " autocomplete__list--hidden" : "" )}>
        { 
          names 
            ? names.map((item, i) => <li key={i}>{ item }</li>)
            : null
        }
      </ul>
    </div>
  )
}