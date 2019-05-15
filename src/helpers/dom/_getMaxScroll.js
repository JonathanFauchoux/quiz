import getDocumentHeight from './_getDocumentHeight'
import getWindowHeight from './_getWindowheight'
import getSize from './_getSize'

export default (container = window) => {
  if (container !== window) {
    return getSize(container).height - getWindowHeight()
  }
  return getDocumentHeight() - getWindowHeight()
}
