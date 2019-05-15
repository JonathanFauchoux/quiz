import Vue from 'vue'
import store from '../store'
import { wait } from '@helpers/time'
import scrollMonitor from 'scrollMonitor'

class Reveal {
  constructor (el, options) {
    this.element = el
    this.options = Object.assign({
      offset: -this.element.offsetHeight - 50,
      classIn: 'fadeInUp',
      classOut: 'fadeOutDown',
      duration: 700,
      delay: 600,
      once: true
    }, options || {})
    this.watcher = undefined
    this.enterViewport = this.onEnterViewport.bind(this)
    this.exitViewport = this.onExitViewport.bind(this)
    this.initialize()
  }
  initialize () {
    this.hideElement()
    this.setWatcher()
  }
  hideElement () {
    this.element.style.opacity = 0
    this.element.style.visibility = 'hidden'
  }
  animateIn () {
    wait(this.options.delay, () => {
      this.element.removeAttribute('style')
      this.element.classList.remove(this.options.classOut)
      this.element.classList.add(this.options.classIn)
      this.element.classList.add('animated')

      wait(this.options.duration, () => {
        this.element.classList.remove(this.options.classIn)
        this.element.classList.remove('animated')
      })
    })
  }
  animateOut () {
    this.element.classList.remove(this.options.classIn)
    this.element.classList.add(this.options.classOut)
    this.element.classList.add('animated')

    wait(this.duration, () => {
      this.hideElement()
      this.element.classList.remove(this.options.classOut)
      this.element.classList.remove('animated')
    })
  }
  setWatcher () {
    this.watcher = scrollMonitor.create(this.element, this.options.offset)
    if (this.options.once) {
      this.watcher.one('enterViewport', this.enterViewport)
    } else {
      this.watcher.on('enterViewport', this.enterViewport)
      this.watcher.on('exitViewport', this.exitViewport)
    }
  }
  onEnterViewport () {
    this.animateIn()
    this.updateState()
  }
  onExitViewport () {
    this.animateOut()
    this.updateState()
  }
  updateState () {
    store.dispatch('updateRevealState', 'updated')
    wait(100, () => {
      store.dispatch('updateRevealState', '')
    })
  }
  removeListeners () {
    this.watcher.off('enterViewport', this.enterViewport)
    this.watcher.off('exitViewport', this.exitViewport)
  }
}

const revealDirective = function () {
  return {
    inserted: (el, binding, vnode) => {
      el.controller = new Reveal(el, binding.value)
    }
  }
}

Vue.directive('reveal', revealDirective())
