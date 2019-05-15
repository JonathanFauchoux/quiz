<template>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title text-center">{{ question }}</h3>
      </div>
      <div class="panel-body row">
        <div class="col-xs-12 col-sm-6 text-center">
          <button class="btn btn-primary btn-lg" style="margin: 1rem;" @click="onAnswer(btnData[0].correct)"> {{btnData[0].answer}} </button>
        </div>
        <div class="col-xs-12 col-sm-6 text-center">
          <button class="btn btn-primary btn-lg" style="margin: 1rem;" @click="onAnswer(btnData[1].correct)"> {{btnData[1].answer}} </button>
        </div>
        <div class="col-xs-12 col-sm-6 text-center">
          <button class="btn btn-primary btn-lg" style="margin: 1rem;" @click="onAnswer(btnData[2].correct)"> {{btnData[2].answer}} </button>
        </div>
        <div class="col-xs-12 col-sm-6 text-center">
          <button class="btn btn-primary btn-lg" style="margin: 1rem;" @click="onAnswer(btnData[3].correct)"> {{btnData[3].answer}} </button>
        </div>
      </div>
    </div>

</template>

<script>
const MODE_ADDITION = 1
const MODE_SUBSTRACTION = 2
export default {
  name: 'Question',
  data () {
    return {
      question: 'Oops, an error ocurred :/',
      btnData: [
        { correct: true, answer: 0 },
        { correct: false, answer: 0 },
        { correct: false, answer: 0 },
        { correct: false, answer: 0 }
      ]
    }
  },
  components: {},
  computed: {},
  created () {
    this.generateQuestion()
  },
  methods: {
    generateQuestion () {
      const firstNumber = this.generateRandomNumber(1, 30)
      const secondNumber = this.generateRandomNumber(1, 30)
      const modeNumber = this.generateRandomNumber(1, 2)
      let correctAnswer = 0

      switch (modeNumber) {
        case MODE_ADDITION:
          console.log(firstNumber)
          correctAnswer = firstNumber + secondNumber
          this.question = 'Résultat de  : ' + firstNumber + ' + ' + secondNumber + ' ?'
          break
        case MODE_SUBSTRACTION:
          correctAnswer = firstNumber - secondNumber
          this.question = 'Résultat de : ' + firstNumber + ' - ' + secondNumber + ' ?'
          break
        default:
          correctAnswer = 0
          this.question = 'Oops, il y a une erreur :/'
      }
      this.btnData[0].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer)
      this.btnData[0].correct = false
      this.btnData[1].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer)
      this.btnData[1].correct = false
      this.btnData[2].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer)
      this.btnData[2].correct = false
      this.btnData[3].answer = this.generateRandomNumber(correctAnswer - 10, correctAnswer + 10, correctAnswer)
      this.btnData[3].correct = false

      const correctButton = this.generateRandomNumber(0, 3)
      this.btnData[correctButton].correct = true
      this.btnData[correctButton].answer = correctAnswer
    },
    generateRandomNumber (min, max, except) {
      const rndNumber = Math.round(Math.random() * (max - min)) + min
      // console.log(min, max, rndNumber)
      if (rndNumber === except) {
        return this.generateRandomNumber(min, max, except)
      }
      return rndNumber
    },
    onAnswer (isCorrect) {
      this.$emit('answered', isCorrect)
    }
  }
}
</script>
<style lang="scss">
.panel-body{
  display: flex;
  padding: 5rem;
  .btn{
    padding:1.5rem 2.5rem;
    font-size: 2rem;
    background-color: colors(primary);
    border: 1px solid transparent;
    transition: all .5s ease;
    &:hover{
      color: colors(primary);
      background-color: white;
      border: 1px solid colors(primary);
    }
  }
}
.panel-title{
  padding: 2rem;
  position: relative;
  right: 1.5rem;
}
.panel-heading{
  border-bottom: 1px solid gainsboro;
}
</style>
