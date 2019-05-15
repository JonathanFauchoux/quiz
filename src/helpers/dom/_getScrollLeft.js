export default (container = window) => {
  if (container !== window) {
    return Math.max(container.scrollLeft)
  }
  return Math.max(document.body.scrollTop, document.documentElement.scrollTop)
}
