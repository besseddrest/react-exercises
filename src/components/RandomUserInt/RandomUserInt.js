import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './random-user-int.scss';

// column sort
// - add col header onclick sort function
// - should set new `locations` in state
// - asc, desc, default
// search input
// - add input with debounce
// - should filter and set new `locations`, or maybe `filteredLocations`
// - by keeping track of default and filter separately we can return to default easily
const SORT_VALUES = {
  DEFAULT: 'DEFAULT',
  ASC: 'ASC',
  DESC: 'DESC',
};

export default function RandomUserInt () {
  useEffect(() => {
    fetchData();
  }, []);

  const [locations, setLocations] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT_VALUES.DEFAULT);
  const defaultLocs = useRef();

  async function fetchData() {
    return await axios.get('https://randomuser.me/api/?results=20')
      .then(response => {
        const flat = defaultLocs.current = flattenLocations(response.data.results);
        setHeaders(Object.keys(flattenObject(response.data.results[0].location)));
        setLocations(flat);
      })
      .catch(err => console.error(err));
  }

  function flattenObject(obj) {
    let result = {};

    for (const item in obj) {
      if ((typeof obj[item] === 'object' && !Array.isArray(obj[item]))) {
        const temp = flattenObject(obj[item]);
        for (const innerItem in temp) {
          result[item + '.' + innerItem] = temp[innerItem]   
        }
      } else {
        result[item] = obj[item];
      }
    }
    return result;
  }

  function flattenLocations(arr) {
    const flattened = [];

    for (let i = 0; i < arr.length; i++) {
      flattened.push(flattenObject(arr[i].location));
    }
    return flattened;
  }

  function handleColumnSort(ev) {
    const col = ev.target.innerText.toString();
    let locs = locations.slice();

    switch(sortOrder) {
      case sortOrder === SORT_VALUES.DEFAULT:
        locs.sort((a, b) => {
          if (a[col] < b[col]) return -1;
          if (a[col] > b[col]) return 1;
          return 0;
        });
        setSortOrder(SORT_VALUES.ASC);
      case sortOrder === SORT_VALUES.ASC:
        locs.sort((a, b) => {
          if (a[col] < b[col]) return 1;
          if (a[col] > b[col]) return -1;
          return 0;
        });
        setSortOrder(SORT_VALUES.DESC);
      default:
        locs = defaultLocs.current;
        setSortOrder(SORT_VALUES.DEFAULT);
    }

    setLocations(locs);
  }

  return (
    <>
      <h1>RandomUser (Intermediate) Exercise</h1>
      <table className="location__table">
        <tbody>
          <tr onClick={ev => handleColumnSort(ev)}>
            {
              headers.map((header, i) => (<th key={"header-" + i}>{ header }</th>))
            }
          </tr>
          {
            locations.map((item, j) => (
            <tr key={"location-" + j}>
              {
                Object.values(item).map((val, k) => <td key={"value-" + k}>{ val }</td>)
              }
            </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}