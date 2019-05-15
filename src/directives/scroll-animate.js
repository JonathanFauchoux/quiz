import Vue from 'vue'
import {
  getScrollTop,
  getMaxScroll,
  getPosition,
  getType
} from '@helpers/dom'

import {
  getDifference
} from '@helpers/number'

class ScrollAnimateController {
  constructor (el, options) {
    this.element = el
    this.options = {}

    this.property = ''
    this.unity = ''
    this.min = 0
    this.max = 0
    this.trigger = window
    this.offset = 0
    this.mobile = false
    this.enabled = false

    this.start = 0
    this.end = 0
    this.maxScroll = 0
    this.triggerType = ''
    this.container = window
    this.ratio = 0
    this.operator = 1
    this.realTopPosition = 0

    this.scrollEvent = this.onScrollEvent.bind(this)
    this.windowResize = this.onWindowResize.bind(this)

    window.addEventListener('resize', this.windowResize)

    this.refresh(options)
  }

  refresh (options = this.options) {
    this.setOptions(options)
    if (this.enabled) {
      this.updateTriggerType()
      this.updateOperator()
      this.updateMaxScroll()
      this.updateStartEnd()
      this.updateRatio()

      const scrollContainer = this.container === window ? document : this.container
      if (!this.mobile && window.innerWidth < 1024) {
        scrollContainer.removeEventListener('scroll', this.scrollEvent)
        this.element.removeAttribute('style')
      } else {
        scrollContainer.addEventListener('scroll', this.scrollEvent)
        this.setProperty()
      }
    }
  }

  onScrollEvent (event) {
    this.setProperty()
  }

  onWindowResize (event) {
    this.refresh()
  }

  setOptions (options) {
    this.options = { ...options }
    this.updateOptions()
  }

  setProperty () {
    const scrollPosition = getScrollTop(this.container)
    const currentPosition = scrollPosition - this.start
    const value = (scrollPosition > this.start && scrollPosition <= this.end)
      ? this.min + (currentPosition * this.ratio * this.operator)
      : (scrollPosition <= this.start)
        ? this.min
        : this.max
    switch (this.property) {
      case 'rotate':
        this.element.style.transform = `rotate3d(0, 0, 1, ${value}${this.unity})`
        this.element.style.webkitTransform = `rotate3d(0, 0, 1, ${value}${this.unity})`
        break
      case 'rotateX':
        this.element.style.transform = `rotate3d(1, 0, 0, ${value}${this.unity})`
        this.element.style.webkitTransform = `rotate3d(1, 0, 0, ${value}${this.unity})`
        break
      case 'rotateY':
        this.element.style.transform = `rotate3d(0, 1, 0, ${value}${this.unity})`
        this.element.style.webkitTransform = `rotate3d(0, 1, 0, ${value}${this.unity})`
        break
      case 'rotateZ':
        this.element.style.transform = `rotate3d(0, 0, 1, ${value}${this.unity})`
        this.element.style.webkitTransform = `rotate3d(0, 0, 1, ${value}${this.unity})`
        break

      case 'scale':
        this.element.style.transform = `scale3d(${value}${this.unity}, ${value}${this.unity}, 1)`
        this.element.style.webkitTransform = `scale3d(${value}${this.unity}, ${value}${this.unity}, 1)`
        break
      case 'scaleX':
        this.element.style.transform = `scale3d(${value}${this.unity}, 1, 1)`
        this.element.style.webkitTransform = `scale3d(${value}${this.unity}, 1, 1)`
        break
      case 'scaleY':
        this.element.style.transform = `scale3d(1, ${value}${this.unity}, 1)`
        this.element.style.webkitTransform = `scale3d(1, ${value}${this.unity}, 1)`
        break
      case 'scaleZ':
        this.element.style.transform = `scale3d(1, 1, ${value}${this.unity})`
        this.element.style.webkitTransform = `scale3d(1, 1, ${value}${this.unity})`
        break

      case 'translate':
        this.element.style.transform = `translate3d(${value}${this.unity}, ${value}${this.unity}, 0)`
        this.element.style.webkitTransform = `translate3d(${value}${this.unity}, ${value}${this.unity}, 0)`
        break
      case 'translateX':
        this.element.style.transform = `translate3d(${value}${this.unity}, 0, 0)`
        this.element.style.webkitTransform = `translate3d(${value}${this.unity}, 0, 0)`
        break
      case 'translateY':
        this.element.style.transform = `translate3d(0, ${value}${this.unity}, 0)`
        this.element.style.webkitTransform = `translate3d(0, ${value}${this.unity}, 0)`
        break
      case 'translateZ':
        this.element.style.transform = `translate3d(0, 0, ${value}${this.unity})`
        this.element.style.webkitTransform = `translate3d(0, 0, ${value}${this.unity})`
        break
      default:
        this.element.style[this.property] = `${value}${this.unity}`
    }
  }

  updateMaxScroll () {
    this.maxScroll = getMaxScroll(this.container.children[0])
  }

  updateOffset (offset) {
    switch (offset) {
      case 'center':
        this.offset = (-window.innerHeight / 2) - this.element.offsetHeight
        break
      case 'top':
        this.offset = -this.element.offsetHeight
        break
      case 'bottom':
        this.offset = -window.innerHeight
        break
      default:
        this.offset = offset
    }
  }

  updateOperator () {
    this.operator = (this.min > this.max) ? -1 : 1
  }

  updateOptions () {
    this.property = this.options.property || ''
    this.unity = this.options.unity || ''
    this.min = this.options.min || 0
    this.max = this.options.max || 0
    this.trigger = this.options.trigger || window
    this.mobile = this.options.mobile || false
    this.enabled = this.options.enabled || false
    this.updateOffset(this.options.offset || 0)
  }

  updateRatio () {
    this.ratio = getDifference(this.min, this.max) / getDifference(this.start, this.end)
  }

  updateTriggerType () {
    this.triggerType = this.trigger ? getType(this.trigger) : ''
    this.container = this.triggerType === 'string' ? document.querySelector(this.trigger) : window
  }

  updateStartEnd () {
    switch (this.triggerType) {
      case 'node':
        this.realTopPosition = getPosition(this.trigger).top
        this.start = (this.realTopPosition < this.maxScroll) ? this.realTopPosition : this.maxScroll - this.trigger.offsetHeight
        this.end = this.realTopPosition + this.trigger.offsetHeight
        break

      case 'number' :
        this.start = 0
        this.end = this.trigger
        break

      case 'string' :
        const element = document.querySelector(this.trigger)
        this.realTopPosition = getPosition(element).top
        this.start = (this.realTopPosition < this.maxScroll) ? this.realTopPosition : this.maxScroll - element.offsetHeight
        this.end = this.realTopPosition + element.offsetHeight
        break

      case 'object' :
        const objectType = this.trigger.toString()
        if (objectType === '[object Window]') {
          this.start = 0
          this.end = this.maxScroll
        } else {
          this.start = this.trigger.in
          this.end = this.trigger.out
        }
        break

      default :
        this.start = 0
        this.end = this.maxScroll
    }

    this.start += this.offset
    this.end += this.offset

    if (this.maxScroll < this.end) this.end = this.maxScroll
  }
}

const scrollAnimateDirective = function () {
  return {
    twoWay: true,
    inserted: (el, binding, vnode) => {
      el.controller = new ScrollAnimateController(el, binding.value)
    },
    update: (el, binding, vnode) => {
      el.controller.refresh(binding.value)
    }
  }
}

Vue.directive('scroll-animate', scrollAnimateDirective())
