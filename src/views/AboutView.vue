<script setup>
import { useShopStore } from "../stores/shop.js";
import itemsData from '../assets/static-data/items.json'

const shop = useShopStore();
</script>

<template>
  <div class="about">
  </div>
  {{items}}
  <h3 class="shop">
    Total: {{ shop.total }}
  </h3>
</template>

<style></style>
