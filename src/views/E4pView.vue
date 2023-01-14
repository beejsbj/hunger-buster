<script setup>
import SimpleMath from "../components/SimpleMath.vue";
import SelfCheckout from "../components/SelfCheckout.vue";
</script>
<template>
  <div class="two-form">
    <div><SimpleMath msg="Simple Math"> </SimpleMath></div>

    <div><SelfCheckout msg="Self Checkout"> </SelfCheckout></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .two-form {
    min-height: 100vh;
    display: grid;
/*    grid-template-columns: 1fr 1fr;*/
    gap: 20px;
    align-items: center;
    
  }
}
</style>
