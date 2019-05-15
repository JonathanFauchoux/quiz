<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
    <div class="tooltip" :class="customClasses" v-show="active">
      <span>{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppTooltip',
  props: {
    text: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: false,
      default: 'top'
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    customClasses () {
      return [
        `is-${this.position}`
      ]
    }
  }
}
</script>

<style lang="scss">
  .tooltip{
    $background-color: shade(colors("topbar"), 20%);
    padding: .7rem 1rem;
    color: white;
    background-color: $background-color;
    border-radius: layout("border-radius");
    pointer-events: none;
    position: absolute;
    z-index: 100;
    // white-space: nowrap;
    word-wrap: break-word;
    width: auto;
    max-width: 20rem;
    text-align: center;
    font-size: 1.4rem;
    font-weight: font-weight("medium");

    // Triangle

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 4px 0 4px;
      border-color: $background-color transparent transparent transparent;
      display: block;
      content: "";
    }

    // TOP

    &.is-top,
    &.is-top-left,
    &.is-top-right{
      top: -1.3rem;
      &::before{
        bottom: 0;
      }
    }

    &.is-top{
      left: 50%;
      transform: translate(-50%, -100%);
      &::before{
        left: 50%;
        transform: translate(-50%, 100%);
      }
    }

    &.is-top-left{
      left: 0rem;
      transform: translate(0%, -100%);
      &::before{
        left: 1rem;
        transform: translate(0%, 100%);
      }
    }

    &.is-top-right{
      right: 0rem;
      transform: translate(0%, -100%);
      &::before{
        right: 1rem;
        transform: translate(0%, 100%);
      }
    }

    // BOTTOM

    &.is-bottom,
    &.is-bottom-left,
    &.is-bottom-right{
      bottom: -1.3rem;
      &::before{
        top: 0;
      }
    }

    &.is-bottom{
      left: 50%;
      transform: translate(-50%, 100%);
      &::before{
        left: 50%;
        transform: translate(-50%, -100%) rotate(180deg);
      }
    }

    &.is-bottom-left{
      left: 0;
      transform: translate(0, 100%);
      &::before{
        left: 1rem;
        transform: translate(-50%, -100%) rotate(180deg);
      }
    }

     &.is-bottom-right{
      right: 0;
      transform: translate(0, 100%);
      &::before{
        right: 1rem;
        transform: translate(-50%, -100%) rotate(180deg);
      }
    }

  }
</style>
