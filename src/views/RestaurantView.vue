<script setup>
import { useRoute, useRouter } from "vue-router";

import { useShopStore } from "../stores/shop.js";

const route = useRoute();
const router = useRouter();
const shop = useShopStore();

const item = shop.list.items.find(function (item) {
  return route.params.slug == item.id || route.params.slug == item.slug;
});

function redirect() {
  router.push({ path: `/items` });
}
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
      <button
        @click="
          shop.erase(item);
          redirect();
        "
      >
        Remove Item
      </button>
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
