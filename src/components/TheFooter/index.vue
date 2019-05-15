<template>
  <footer class="footer">
    <ContainerInner class="footer__inner"></ContainerInner>
  </footer>
</template>

<script>
import ContainerInner from '@components/ContainerInner'

export default {
  name: 'TheFooter',
  components: {
    ContainerInner
  }
}
</script>

<style lang="scss">
  .footer{}
</style>
