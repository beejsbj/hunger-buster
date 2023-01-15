<script setup>
import { useCounterStore } from "../stores/counter.js";


const counter = useCounterStore();



defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green" @click="counter.increment()">hello world {{ msg }}</h1>
  </div>

  <div class="counter">
    {{  counter.count }}
  </div>

</template>

<style scoped>
 .greetings {
   border: 1px solid green;
 }
</style>
