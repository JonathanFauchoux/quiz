<template>
  <div class="home-view container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="text-center">Quizzz</h1>
      </div>
    </div>
    <div class="row ">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 global" >
        <transition name="flip" mode="out-in" >
          <component :is="mode" @answered="answered($event)" @confirmed="mode = 'Question'">

          </component>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
import Question from '@components/Question'
import Answer from '@components/Answer'

export default {
  name: 'HomeView',
  data () {
    return {
      mode: 'Question'
    }
  },
  components: {
    Answer,
    Question
  },
  computed: {
  },
  created () {},
  methods: {
    answered (isCorrect) {
      if (isCorrect) {
        this.mode = 'Answer'
      } else {
        this.mode = 'Question'
        alert('Wrong! try again...')
      }
    }
  }
}
</script>
<style lang="scss">
.home-view{
  height: 100%;
}
h1{
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: .4rem;
  font-family: cursive;
  color: colors(primary);
  padding: 2rem 0;
  background-color: gainsboro;
  border-radius: 1rem;
}
.global{
  border: 1px solid gainsboro;
  border-radius: 1rem;
}

.flip-enter{
  //transform: rotateY(0deg);
}
.flip-enter-active{
  animation: flip-in .5s ease-out forwards;

}
.flip-leave{

}
.flip-leave-active{
  animation: flip-out .5s ease-out forwards;
}

@keyframes flip-out{
  from{
    transform: rotateY(0deg);
  }
  to{
    transform: rotateY(90deg);
  }
}

@keyframes flip-in{
  from{
    transform: rotateY(90deg);
  }
  to{
    transform: rotateY(0deg);
  }
}
</style>
