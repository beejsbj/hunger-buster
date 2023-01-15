<script setup>
import HelloWorld from "../components/HelloWorld.vue";
import { useCartStore } from "../stores/cart.js";
const cart = useCartStore();
</script>

<template>
  <div class="about">
    <HelloWorld msg=" this is About" />
  </div>

  <h3 class="cart">
    Total: {{ cart.total }}
  </h3>
</template>

<style></style>
