<script setup>
	// transferItems();
	//create function that takes restaurant categories and creates a new array of objects with the name and value of the category
	import { updateDoc } from "firebase/firestore";
	import slug from "slug";
	import { useCollection, useDocument, useFirestore } from "vuefire";
	import { collection, doc, getDoc } from "firebase/firestore";

	const markers = ref([
		{
			position: {
				lat: 51.093048,
				lng: 6.84212,
			},
		}, // Along list of clusters
	]);
</script>



<template></template>

<style></style>
