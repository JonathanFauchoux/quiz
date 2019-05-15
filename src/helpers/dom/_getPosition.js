export default (element) => {
  let xPos = 0
  let yPos = 0
  while (element) {
    if (element.tagName === 'BODY') {
      const xScroll = element.scrollLeft || document.documentElement.scrollLeft
      const yScroll = element.scrollTop || document.documentElement.scrollTop
      xPos += (element.offsetLeft - xScroll + element.clientLeft)
      yPos += (element.offsetTop - yScroll + element.clientTop)
    } else {
      xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft)
      yPos += (element.offsetTop - element.scrollTop + element.clientTop)
    }
    element = element.offsetParent
  }
  return {
    left: xPos,
    top: yPos
  }
}
