export function debounce(fn: Function, wait: number = 300) {
  let timeout: null | NodeJS.Timeout = null;
  return function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments);
    }, wait);
  };
}
