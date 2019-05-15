export default string => {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/,/g, '-').replace(/\s+/g, '-').toLowerCase()
}
