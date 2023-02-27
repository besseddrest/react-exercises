// laymans:
// this function returns an execution of a function behind a setTimeout
// if debounce is called anytime before the `timeout` value that instance is cleared
// and we start a new instance of the function with a full timeout value
const debounce = (fn, timeout) => {
  let timeoutId;
  return function (this, ...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), timeout);
  }
}