<template>
  <a :href="urlPath" class="button" :class="customClasses">
    <AppIcon :type="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script>
import AppIcon from '@components/AppIcon.vue'

export default {
  name: 'AppButton',
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    hollow: {
      type: Boolean,
      required: false,
      default: false
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false
    },
    circle: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    iconPosition: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    AppIcon
  },
  computed: {
    iconClasses () {
      if (this.icon) {
        return (this.iconPosition) ? `has-icon-${this.iconPosition}` : 'has-icon-center'
      }
      return ''
    },
    customClasses () {
      return [
        (this.color) ? `is-${this.color}` : '',
        this.iconClasses,
        {
          'is-disabled': this.disabled,
          'is-clear': this.clear,
          'is-hollow': this.hollow,
          'is-rounded': this.rounded,
          'is-circle': this.circle,
          'is-active': this.active
        }
      ]
    },
    urlPath () {
      return this.url ? this.url : 'javascript:void(0);'
    }
  }
}
</script>

<style lang="scss">
  $button-color-list: (primary, secondary);

  $button-variables: (
    padding: 0.6em 1.2em,
    border: 1px solid,
    font-size: 1.4rem,
    font-weight: font-weights("bold"),
    line-height: 1,
  );

  .button{
    @include add-transition;
    @include print-css($button-variables);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    vertical-align: middle;
    white-space: nowrap;
    text-decoration: none;
    outline: 0;
    appearance: none;
    user-select: none;
    cursor: pointer;
    line-height: 1;
    border-radius: layout("border-radius");

    border-color: transparent;
    color: white;
    background-color: rgba(colors(primary), .6);

    @include hover{
      border-color: transparent;
      background-color: rgba(colors(primary), 1);
    }

    &::before,
    &::after{
      line-height: 1;
      flex: 0 1 auto;
    }

    &:before{
      margin-right: 1rem;
    }

    &:after{
      margin-left: 1rem;
    }

    span{
      flex: 0 1 auto;
    }

    // Rounded

    &.is-rounded{
      border-radius: layout("rounded");
    }

    // Clear

    &.is-clear{
      color: lighten(black, 30%);
      background-color: transparent;
      text-transform: initial;
      padding: 0;

      @include hover{
        color: lighten(black, 10%);
        background-color: transparent;
      }
    }

    //Hollow

    .is-hollow{
      color: lighten(black, 30%);
      background-color: transparent;
      border-color: lighten(black, 80%);
      @include hover{
        color: lighten(black, 10%);
        background-color: transparent;
        border-color: lighten(black, 70%);
      }
    }

    // Disabled

    .is-disabled{
      opacity: 0.25;
      cursor: not-allowed;
      pointer-events: none;
    }

    // Icon

    &.has-icon-center{
      padding: 0.7em 1.5em;
      span{
        @include hide-visually;
      }
    }

    &.has-icon-left{
      flex-direction: row;
      .icon{
        margin-right: 1rem;
      }
    }

    &.has-icon-right{
      flex-direction: row-reverse;
      .icon{
        margin-left : 1rem;
      }
    }

    // Circle

    &.is-circle{
      @include size(5rem);
      padding: 0;
      border-radius: 50%;
    }

    // Button Color Classes

    @each $color in $button-color-list{
      &.is-#{$color}{
        border-color: transparent;
        color: white;
        background-color: colors(#{$color});

        @include hover{
          border-color: transparent;
          color: white;
          background-color: lighten(colors(#{$color}), 10%);
        }

        &.is-clear{
          color: colors(#{$color});
          background-color: transparent;
          @include hover{
            color: lighten(colors(#{$color}), 10%);
            background-color: transparent;
          }
        }

        &.is-hollow{
          color: colors(#{$color});
          border-color: colors(#{$color});
          background-color: transparent;
          @include hover{
            color: lighten(colors(#{$color}), 10%);
            border-color: lighten(colors(#{$color}), 10%);
            background-color: transparent;
          }
        }
      }
    }
  }
</style>
