<script setup>
import { useShopStore } from "../stores/shop.js";

const shop = useShopStore();
</script>

<template>
  <div class="about"></div>
  <h3 class="shop">Total: {{ shop.total }}</h3>
</template>

<style></style>
