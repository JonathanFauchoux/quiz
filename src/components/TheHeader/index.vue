<template>
  <header class="header">
    <ContainerInner class="header__inner"></ContainerInner>
  </header>
</template>

<script>
import ContainerInner from '@components/ContainerInner'

export default {
  name: 'TheHeader',
  components: {
    ContainerInner
  }
}
</script>

<style lang="scss">
  .header{}
</style>
