import Vue from 'vue'
import {
  addCSS,
  getClosest,
  getPosition,
  getScrollTop,
  getSize
} from '@helpers/dom'

class CustomSticky {
  constructor (el, options) {
    this.element = el

    this.offset = 0
    this.disabled = true

    this.parent = undefined
    this.watcher = undefined

    this.lastPosition = 0
    this.elementPosition = {}
    this.parentPosition = {}

    this.elementSize = {}
    this.parentSize = {}

    this.scrollTop = 0
    this.start = 0
    this.end = 0

    this.windowScroll = this.onWindowScroll.bind(this)

    this.refresh(options)
    this.initialize()
  }

  initialize () {
    this.parent = getClosest(this.element, '[custom-sticky-container]')
    window.addEventListener('scroll', this.windowScroll)
  }

  onWindowScroll () {
    if (!this.disabled) {
      this.updateValues()
      if (this.scrollTop >= this.start && this.scrollTop <= this.end) {
        addCSS(this.element, {
          position: 'fixed',
          top: `${this.offset}px`,
          left: `${this.elementPosition.left}px`,
          width: `${this.elementSize.width}px`,
          height: `${this.elementSize.height}px`
        })
      } else if (this.scrollTop < this.start) {
        this.element.removeAttribute('style')
      } else {
        this.element.style.position = ''
        this.element.style.left = ''
        this.element.style.width = ''
        this.element.style.height = ''
        addCSS(this.element, {
          top: `${this.lastPosition}px`
        })
      }
    } else {
      this.element.removeAttribute('style')
    }
  }

  updateOptions (options) {
    this.options = { ...options }
    this.offset = this.options.offset
    this.disabled = this.options.disabled
  }

  updateValues () {
    this.scrollTop = getScrollTop()
    this.elementPosition = getPosition(this.element)
    this.parentPosition = getPosition(this.parent)
    this.elementSize = getSize(this.element)
    this.parentSize = getSize(this.parent)

    this.start = this.parentPosition.top - this.offset
    this.end = this.parentPosition.top + this.parentSize.height - this.elementSize.height - this.offset
    this.lastPosition = this.parentSize.height - this.elementSize.height
  }

  refresh (options = this.options) {
    this.updateOptions(options)
  }
}

const customStickyDirective = function () {
  return {
    twoWay: true,
    inserted: (el, binding, vnode) => {
      el.controller = new CustomSticky(el, binding.value)
    },
    update: (el, binding, vnode) => {
      el.controller.refresh(binding.value)
    }
  }
}

Vue.directive('custom-sticky', customStickyDirective())
