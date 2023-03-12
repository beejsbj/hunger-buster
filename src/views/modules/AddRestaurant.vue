
<script setup>
	import { useStorage } from "@vueuse/core";

	import { useShopStore } from "@/stores/shop";
	const shop = useShopStore();

	const restaurantForm = useStorage("restaurantForm", {
		name: "",
		image: "",
		phone: "",
		address: {},
		website: "",
		notes: "",
	});

	function numberFormat(event) {
		// if (event.key == "-" && isNaN(event.key) && event.key !== "Backspace") {
		// 	console.log(event);
		// 	restaurantForm.phone = restaurantForm.phone.slice(0, -1);
		// 	return;
		// }
		// if (restaurantForm.phone.length == 3 || restaurantForm.phone.length == 7) {
		// 	restaurantForm.phone += "-";
		// }
	}

	function setPlace(place) {
		restaurantForm.value.address = {
			formatted_address: place.formatted_address,
			location: {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			},
			name: place.name,
			placeId: place.place_id,
			url: place.url,
		};
	}
</script>

<template>
	<form @submit.prevent="shop.addRestaurant(restaurantForm)">
		<h1 class="attention-voice">Add a Restaurant</h1>
		<input-field>
			<label for="name"> Enter restaurant's name. </label>
			<input
				type="text"
				:required="false"
				v-model="restaurantForm.name"
				id="name"
				placeholder="Restaurant Name"
			/>
		</input-field>

		<input-field>
			<label for="image"> Enter restaurant's image URL. </label>
			<input
				type="text"
				v-model="restaurantForm.image"
				id="image"
				placeholder="Image URL"
			/>
		</input-field>

		<input-field>
			<label for="phone"> Enter restaurant's phone number. </label>
			<input
				:required="false"
				type="tel"
				v-model="restaurantForm.phone"
				id="phone"
				placeholder="123-456-7890"
				pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
				maxlength="12"
				@keyup="numberFormat"
			/>
		</input-field>

		<input-field>
			<label for="address"> Enter restaurant's address. </label>
			<GMapAutocomplete
				required
				id="address"
				:placeholder="restaurantForm.address?.formatted ?? 'Address'"
				@place_changed="setPlace"
				v-model="restaurantForm.address"
			>
				{{ restaurantForm.address?.formatted }}
			</GMapAutocomplete>
		</input-field>

		<input-field>
			<label for="website"> Enter restaurant's website. </label>
			<input
				type="text"
				v-model="restaurantForm.website"
				id="website"
				placeholder="Website"
			/>
		</input-field>

		<input-field>
			<label for="notes"> Describe your restaurant </label>
			<textarea
				v-model="restaurantForm.notes"
				id="notes"
				placeholder="description"
			/>
		</input-field>

		<button class="button">Add restaurant</button>
	</form>
</template>

<style lang="scss" scoped>
</style>