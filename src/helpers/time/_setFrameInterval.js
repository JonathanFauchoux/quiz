export default (fn, delay) => {
  let start = new Date().getTime()
  const handle = {}

  function loop () {
    const current = new Date().getTime()
    const delta = current - start

    if (delta >= delay) {
      fn.call()
      start = new Date().getTime()
    }

    handle.value = window.requestAnimationFrame(loop)
  }

  handle.value = window.requestAnimationFrame(loop)
  return handle
}
