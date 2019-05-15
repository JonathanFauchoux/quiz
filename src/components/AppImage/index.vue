<template>
  <div class="image" :class="customClasses" :style="customStyle">
    <img :src="src" alt="" v-if="!hasBackground">
  </div>
</template>
<script>
export default {
  name: 'AppImage',
  props: {
    hasBackground: {
      type: Boolean,
      required: false,
      default: false
    },
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    customClasses () {
      return [
        { 'has-background': this.hasBackground }
      ]
    },
    backgroundStyle () {
      return (this.hasBackground) ? `background-image: url(${this.src});` : ''
    },
    customStyle () {
      return `
        ${this.backgroundStyle}
      `
    }
  }
}
</script>

<style lang="scss">
  .image{
    &.has-background{
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    img{
      height                 : auto;
      max-width              : 100%;
      display                : inline-block;
      vertical-align         : middle;
      -ms-interpolation-mode : bicubic;
    }
  }
</style>
