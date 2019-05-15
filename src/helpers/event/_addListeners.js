export default (el, names, fn) => {
  if (el) {
    names.split(' ').forEach(e => el.addEventListener(e, fn, true))
  }
}
