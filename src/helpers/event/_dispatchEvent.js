export default (el, name, obj = {}) => {
  if (el) {
    el.dispatchEvent(new window.CustomEvent(name, { detail: obj }))
  }
}
