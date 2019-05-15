export default (el, selector) => {
  if (!window.Element.prototype.matches) {
    window.Element.prototype.matches =
      window.Element.prototype.matchesSelector ||
      window.Element.prototype.mozMatchesSelector ||
      window.Element.prototype.msMatchesSelector ||
      window.Element.prototype.oMatchesSelector ||
      window.Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s)
        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) { }
        return i > -1
      }
  }
  for (; el && el !== document; el = el.parentNode) {
    if (el.matches(selector)) return el
  }
  return null
}
