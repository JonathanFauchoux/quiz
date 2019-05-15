export default (container = window) => {
  if (container !== window) {
    return Math.max(container.scrollTop)
  }
  return Math.max(document.body.scrollTop, document.documentElement.scrollTop)
}
