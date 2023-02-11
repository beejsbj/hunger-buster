<script setup>
   import { useFirestore, useCollection } from "vuefire";
   import { computed, ref } from "vue";
   import { v4 as uuid } from "uuid";

   import {
      collection,
      addDoc,
      getDocs,
      setDoc,
      doc,
   } from "firebase/firestore";
</script>

<template>
   <div class="about"></div>
   <ul>
      <li v-for="rest in restaurants">{{ rest.name }}</li>
   </ul>
</template>

<style></style>
