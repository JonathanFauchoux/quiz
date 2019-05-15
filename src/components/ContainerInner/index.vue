<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContainerInner',
  data () {
    return {
      className: 'inner'
    }
  }
}
</script>

<style lang="scss">
  .inner{
    @include media("small-medium"){
      padding-left: layout("spacing");
      padding-right: layout("spacing");
    }
    @include media("large"){
      padding-left: layout("spacing");
      padding-right: layout("spacing");
    }
  }
</style>
