<template>
  <component :is="tag" class="icon" :class="className">
    <span v-if="text">{{ text }}</span>
  </component>
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  computed: {
    className () {
      return `icon-${this.type}`
    }
  }
}
</script>

<style lang="scss">
  .icon{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right:    0;
    margin-left:     0;
    font-size:       1.6rem;
    text-align:      center;
    text-decoration: inherit;
    text-transform:  none;
    speak: none;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before, span{
      flex: 0 0 auto;
    }

    span{
      @include hide-visually;
    }
  }

  @each $value, $content in $icons{
    .icon-#{$value}{
      @include icon(icons($value), "before");
    }
  }

  // Specific styles for icons

  // .icon-cross{
  //   @include size(4rem);
  //   border-top-left-radius: 1rem;
  //   border-bottom-right-radius: 1rem;
  //   background-color: red;
  // }
</style>
