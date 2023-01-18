<script setup>
import { useShopStore } from "../stores/shop.js";
const shop = useShopStore();
</script>

<template>
  <h3 class="attention-voice">Total: {{ shop.total }}</h3>
  <table class="styled-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in shop.cart">
        <td>{{ i + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>${{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.total }}</td>
        <td><button @click="shop.remove(item)">Remove</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Total:</td>
        <td>${{ shop.total }}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<style>
table {
  width: 100%;
}

tr {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
}
tr > * {
  padding: 10px;
}

thead,
tfoot {
  background-color: hsla(15, 19%, 60%, 1);
}

tbody tr:nth-of-type(even) {
  background-color: hsla(209, 39%, 48%, 1.00);
}

.flex-list {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}
</style>
