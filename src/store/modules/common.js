const actions = {
  async updateCommonContent ({ dispatch }, content) {
    dispatch('header/updateHeader', content.header || null, { root: true })
    dispatch('footer/updateFooter', content.footer || null, { root: true })
  }
}

export default {
  actions,
  namespaced: true
}
