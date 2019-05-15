<template>
  <div id="app" class="app">
    <div class="wrapper" v-if="loaded">
      <!-- Header -->
      <TheHeader />
      <!-- Main -->
      <main class="main">
        <router-view class="page" />
      </main>
      <!-- Footer -->
      <TheFooter />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import scrollMonitor from 'scrollmonitor'
import { debounce } from 'lodash'

import { addListeners } from '@helpers/event'
import TheHeader from '@components/TheHeader'
import TheFooter from '@components/TheFooter'
import Provider from '@api/provider'

const breakpoints = [
  { name: 'small', min: 0, max: 767 },
  { name: 'medium', min: 768, max: 1023 },
  { name: 'large', min: 1024, max: 1440 },
  { name: 'xlarge', min: 1441, max: 20000 }
]

export default {
  data () {
    return {
      loaded: false
    }
  },
  components: {
    TheHeader,
    TheFooter
  },
  computed: {
    ...mapGetters({
      device: 'breakpoints/getDevice',
      breakpoint: 'breakpoints/getBreakpoint'
    })
  },
  created () {
    Provider.common.getCommonContent().then(data => {
      this.updateCommonContent(data)
      this.loaded = true
    })
  },
  mounted () {
    addListeners(window, 'resize', this.debouncedMethod)
    this.updateBreakpoints(breakpoints)
    this.updateWindowWidth(window.innerWidth)
  },
  methods: {
    ...mapMutations('breakpoints', [
      'updateBreakpoints'
    ]),
    ...mapActions('common', [
      'updateCommonContent'
    ]),
    ...mapActions('breakpoints', [
      'updateWindowWidth'
    ]),
    debouncedMethod: debounce(function () {
      this.handleWindowResize()
    }, 100),
    handleWindowResize () {
      this.updateWindowWidth(window.innerWidth)
      this.updateScrollMonitor()
    },
    updateScrollMonitor () {
      scrollMonitor.recalculateLocations()
      scrollMonitor.update()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/main/main.scss";

.app{
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: colors("background");

  .main{
    .page{
      width: 100%;
    }
  }
}
</style>
