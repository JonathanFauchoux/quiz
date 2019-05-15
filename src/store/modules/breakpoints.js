import { dispatchEvent } from '@helpers/event'

const state = {
  breakpoints: [],
  breakpoint: '',
  width: 0,
  device: ''
}

const getters = {
  isDesktop: state => state.device === 'desktop'
}

const mutations = {
  updateBreakpoints: (state, breakpoints) => {
    state.breakpoints = [ ...breakpoints ]
  },
  updateBreakpoint: (state, breakpointName) => {
    state.breakpoint = breakpointName
  },
  updateWidth: (state, width) => {
    state.width = width
  },
  updateDevice: (store, breakpointName) => {
    if (breakpointName === 'small') state.device = 'mobile'
    else if (breakpointName === 'medium') state.device = 'tablet'
    else state.device = 'desktop'
  }
}

const actions = {
  updateWindowWidth: ({ commit, state, dispatch }, windowWidth) => {
    if (windowWidth !== state.width) {
      commit('updateWidth', windowWidth)
      state.breakpoints.forEach(mediaquery => {
        if (windowWidth >= mediaquery.min && windowWidth <= mediaquery.max) {
          commit('updateBreakpoint', mediaquery.name)
          commit('updateDevice', mediaquery.name)
          dispatchEvent(window, 'breakpoints.change', {
            name: state.breakpoint
          })
        }
      })
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
