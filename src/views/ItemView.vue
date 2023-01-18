<script setup>
import { useRoute } from "vue-router";
import { useShopStore } from "../stores/shop.js";

const route = useRoute();
const shop = useShopStore();

const item = shop.list.items.filter(function (item) {
  return item.name == route.params.name;
})[0];
</script>

<template>
  <item-card>
    <h2 class="attention-voice">
      {{ item.name }}
    </h2>
    <picture>
      <img :src="item.image" alt="" />
    </picture>
    <div>
      <p>${{ item.price }}</p>
      <button @click="shop.add(item)">Add to Cart</button>
      <a href="item/" :href="item.name">MORE</a>
    </div>
  </item-card>
</template>

<style scoped>
item-card {
  display: grid;
  gap: 5px;
}
item-card div {
  display: flex;
  justify-content: space-between;
}
</style>
