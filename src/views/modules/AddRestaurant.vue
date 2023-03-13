
<script setup>
	import { useStorage } from "@vueuse/core";

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

	function setImage(file) {
		restaurantForm.value.image = file;
	}
</script>

<template>
	<form
		@submit.prevent="shop.addRestaurant({ ...restaurantForm })"
		enctype="multipart/form-data"
	>
		<h1 class="attention-voice">Add a Restaurant</h1>
		<input-field>
			<label for="name"> Enter restaurant's name. </label>
			<input
				type="text"
				required
				v-model="restaurantForm.name"
				id="name"
				placeholder="Restaurant Name"
			/>
		</input-field>

		<FileUpload @setImage="setImage" />

		<input-field>
			<label for="address"> Enter restaurant's address. </label>
			<GMapAutocomplete
				required
				id="address"
				:placeholder="'Address'"
				@place_changed="setPlace"
				:value="restaurantForm.address?.formatted_address ?? ''"
			/>
		</input-field>

		<input-field>
			<label for="phone"> Enter restaurant's phone number. </label>
			<input
				required
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