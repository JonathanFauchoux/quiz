<template>
    <div class="alert alert-success text-center reponse">
      <h2>That's Correct!</h2>
      <hr>
      <button class="btn btn-primary" @click="onNextQuestion"> Next Question </button>
    </div>
</template>

<script>

export default {
  name: 'Answer',
  data () {
    return {

    }
  },
  components: {},
  computed: {},
  created () {},
  methods: {
    onNextQuestion () {
      this.$emit('confirmed')
    }
  }
}
</script>
<style lang="scss">
h2{
  font-size: 3rem;
}
.reponse{
  padding: 2rem;
  margin: 2rem 0;
}
</style>
