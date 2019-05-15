export default (el, names, fn) => {
  if (el) {
    names.split(' ').forEach(e => el.removeEventListener(e, fn, true))
  }
}
