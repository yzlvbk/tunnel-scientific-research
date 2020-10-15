export const debounce = (fn, wait) => {
  let timer = null

  return () => {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(Event)
      clearTimeout(timer)
    }, wait);
  }
}