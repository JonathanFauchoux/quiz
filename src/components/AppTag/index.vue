
<template>
  <div class="tag" :class="customClasses" v-if="isActive">
    <AppIcon v-if="icon" :type="icon" />
    <a v-if="url" class="tag__content" :href="url">{{ text }}</a>
    <div v-else class="tag__content">{{ text }}</div>
    <button v-if="closable" class="tag__close icon-cross" @click.prevent.stop="onClick">
      <span>Close</span>
    </button>
  </div>
</template>

<script>
import AppIcon from '@components/AppIcon.vue'

export default {
  name: 'AppTag',
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    closable: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  components: {
    AppIcon
  },
  data () {
    return {
      isActive: true
    }
  },
  computed: {
    customClasses () {
      return [
        (this.color) ? `is-${this.color}` : '',
        {
          'is-closable': this.closable,
          'has-link': this.url,
          'has-icon': this.icon
        }
      ]
    }
  },
  methods: {
    onClick () {
      this.isActive = false
      this.$emit('onClick', this.isActive)
    }
  }
}
</script>

<style lang="scss">
  $tag-color-list: (
    grey: #888888,
    yellow: #FFDF00,
    red: #da0041
  );

  $tag-variables: (
    background-color: default(primary),
    border: 1px solid,
    border-color: transparent,
    border-radius: layout("border-radius")/2,
    font-weight: font-weights("medium"),
    font-size: 1.2rem,
    text-align: left,
    line-height: 1.2,
    transition: all 300ms ease-in-out
  );

  .tag{
    @include print-css($tag-variables);

    $background-color: map-get($tag-variables, background-color);
    $padding: 0.3em 0.6em;
    $font-size: map-get($tag-variables, font-size);

    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    // Center to text
    padding-top: 1px;
    vertical-align: text-bottom;

    .icon{
      color: contrast-switch($background-color, white, colors(font));
    }

    // Content

    &__content{
      flex: 1 1 auto;
      padding: $padding;
      color: contrast-switch($background-color, white, colors(font));

      @include hover{
        color: contrast-switch($background-color, white, colors(font));
      }
    }

    // Close

    &__close{
      padding: $padding;
      flex: 0 1 auto;
      height: 100%;
      appearance: none;
      display: flex;
      align-items: center;
      border: 0;
      margin: 0;
      outline: none;
      font-size: $font-size;
      background-color: transparent;
      color: contrast-switch($background-color, white, colors(font));

      @include hover{
        color: contrast-switch($background-color, white, colors(font));
      }

      span{
        @include hide-visually;
      }

      &::before{
        flex: 0 1 auto;
        color: inherit;
      }
    }

    // Colors

    @each $key, $value in $tag-color-list{
      &.is-#{$key}{
        $background-color: $value;
        border-color: transparent;
        background-color: $background-color;

        .tag__content{
          color: contrast-switch($background-color, white, colors(font));
        }

        .tag__close{
          color: contrast-switch($background-color, white, colors(font));
        }

        .icon{
          color: contrast-switch($background-color, white, colors(font));
        }

        &.has-link{
          background-color: transparent;

          .tag__content{
            $background-color: $value;
            background-color: $background-color;
            color: contrast-switch($background-color, white, colors(font));
          }

          .tag__close{
            $background-color: default(secondary);
            background-color: $background-color;
            color: contrast-switch($background-color, white, colors(font));
          }
        }
      }
    }

    // Closable

    &.is-closable{
      .tag__content{
        padding-right: 1rem;
      }
    }

    // Link

    &.has-link{
      $background-color: default(secondary);
      display: inline-flex;
      justify-content: flex-start;
      border-color: transparent;
      background-color: transparent;

      .tag__content,
      .tag__close{
        background-color: $background-color;
        color: contrast-switch($background-color, white, colors(font));
      }

      .tag__content{
        @include border-left-radius(layout("border-radius"));
      }

      .tag__close{
        @include border-right-radius(layout("border-radius"));
      }
    }

    // Icon

    &.has-icon{
      padding-left: 0.6rem;

      .tag__content{
        padding-left: 0.6rem;
      }

      .icon{
        font-size: $font-size;
      }
    }
  }
</style>
