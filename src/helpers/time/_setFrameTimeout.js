export default (fn, delay) => {
  const start = new Date().getTime()
  const handle = {}

  function loop () {
    const current = new Date().getTime()
    const delta = current - start
    if (delta >= delay) {
      fn.call()
    } else {
      handle.value = window.requestAnimationFrame(loop)
    }
  }
  handle.value = window.requestAnimationFrame(loop)
  return handle
}
