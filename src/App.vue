<template>
  <div class="app">
    <div class="wrapper">
      <main class="main">
        <HomeView></HomeView>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import scrollMonitor from 'scrollmonitor'
import { debounce } from 'lodash'

import { addListeners } from '@helpers/event'

import HomeView from '@/views/HomeView'

const breakpoints = [
  { name: 'small', min: 0, max: 767 },
  { name: 'medium', min: 768, max: 1023 },
  { name: 'large', min: 1024, max: 1440 },
  { name: 'xlarge', min: 1441, max: 20000 }
]

export default {
  data () {
    return {
    }
  },
  components: {
    HomeView
  },
  computed: {
    ...mapGetters({
      device: 'breakpoints/getDevice',
      breakpoint: 'breakpoints/getBreakpoint'
    })
  },
  created () {

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
