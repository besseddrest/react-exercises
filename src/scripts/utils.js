const debounce = (fn, timeout) => {
  let timeoutId;
  return function (this, ...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), timeout);
  }
}