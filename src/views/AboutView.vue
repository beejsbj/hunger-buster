<script setup>
  import HelloWorld from '../components/HelloWorld.vue';
  import { useCounterStore } from "../stores/counter.js";
  const counter = useCounterStore();
</script>
<template>
  <div class="about">
    <HelloWorld msg=" this is About" />  </div>

    <div class="counter">
    {{  counter.count }}
  </div>
</template>

<style>

</style>
