if (typeof window.NodeList.prototype.forEach !== 'function') {
  window.NodeList.prototype.forEach = Array.prototype.forEach
}
