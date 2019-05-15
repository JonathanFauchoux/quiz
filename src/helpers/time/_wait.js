import setFrameTimeout from './_setFrameTimeout'
import clearFrameTimeout from './_clearFrameTimeout'

const wait = (time, callback) => {
  const timeout = setFrameTimeout(() => {
    clearFrameTimeout(timeout)
    callback()
  }, time)
}

export default wait
