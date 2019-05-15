export default (element, props) => {
  Object.keys(props).forEach((key) => {
    element.style[key] = props[key]
  })
}
