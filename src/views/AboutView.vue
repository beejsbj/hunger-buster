<script setup>
   import { useFirestore, useCollection } from "vuefire";
   import { collection } from "firebase/firestore";

   const db = useFirestore();
   const testrest = useCollection(collection(db, "restaurants"));
   console.log(testrest);
</script>

<template>
   <div class="about"></div>
   <ul>
      <li v-for="rest in testrest">{{ rest.name }}</li>
   </ul>
</template>

<style></style>
