import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [locations, setLocations] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT_VALUES.DEFAULT);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    fetchData();
    console.log('useEffect');
  }, []);

  async function fetchData() {
    return await axios.get('https://randomuser.me/api/?results=20')
      .then(response => {
        setHeaders(Object.keys(flattenObject(response.data.results[0].location)));
        console.log(response.data.results);
        setLocations(flattenLocations(response.data.results));
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
    const colType = typeof locations[0][col];
    // console.log(colType);
    let locs = locations;

    if (sortOrder === SORT_VALUES.DEFAULT || sortOrder == SORT_VALUES.ASC) {
      locs.sort((a, b) => {
        if (a[col] < b[col]) {
          return -1;
        }
        if (a[col] > b[col]) {
          return 1;
        }
        return 0;
      });
      setSortOrder(SORT_VALUES.DESC);
    } else {
      locs.sort((a, b) => {
        if (a[col] < b[col]) {
          return 1;
        }
        if (a[col] > b[col]) {
          return -1;
        }
        return 0;
      });

      setSortOrder(SORT_VALUES.ASC);
    }

    console.log(locs);
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