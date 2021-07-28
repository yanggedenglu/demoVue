<template>

  <div id="demo">
    <button @click="show = !show">
      Toggle
    </button>
    <!-- transition 1 -->
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
    <!-- transition 2 -->
    <transition name="bounce">
      <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris facilisis enim libero, at lacinia diam fermentum id.
        Pellentesque habitant morbi tristique senectus et netus.</p>
    </transition>
    <!-- transition 3 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <p v-if="show">hello</p>
    </transition>
    <hr>
    <div id="animated-number-demo">
      <input v-model.number="number" type="number" step="20">
      <p>{{ animatedNumber }}</p>
    </div>
  </div>

</template>

<script>
// import { gsap } from '../../static/index'
export default {
  data() {
    return {
      name: 'transition',
      show: true,
      number: 0,
      tweenedNumber: 0
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    number: function(newValue) {
      // gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  },
  methods: {
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
