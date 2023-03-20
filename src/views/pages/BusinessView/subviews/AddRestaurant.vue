<script setup>
	import { useStorage } from "@vueuse/core";

	const shop = useShopStore();
	const props = defineProps(["editing"]);

	const restaurantForm = props.editing
		? shop.restaurant
		: useStorage("restaurantForm", {
				name: "",
				image: "",
				phone: "",
				address: {},
				website: "",
				description: "",
				times: {
					Monday: {
						open: "",
						close: "",
					},
					Tuesday: {
						open: "",
						close: "",
					},
					Wednesday: {
						open: "",
						close: "",
					},
					Thursday: {
						open: "",
						close: "",
					},
					Friday: {
						open: "",
						close: "",
					},
					Saturday: {
						open: "",
						close: "",
					},
					Sunday: {
						open: "",
						close: "",
					},
				},
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
		restaurantImage.value = file;
	}

	const restaurantImage = ref(null);

	function submit() {
		const record = props.editing
			? restaurantForm
			: { ...restaurantForm.value };
		record.image = restaurantImage.value ?? restaurantForm.image;

		shop.addRestaurant(record);
	}
</script>

<template>
	<form
		@submit.prevent="submit()"
		enctype="multipart/form-data"
	>
		<h1 class="attention-voice">
			{{ props.editing ? "Edit" : "Add" }} Restaurant
		</h1>
		<input-field>
			<label for="name"> name. </label>
			<input
				type="text"
				required
				v-model="restaurantForm.name"
				id="name"
				placeholder="Restaurant Name"
			/>
		</input-field>

		<FileUpload
			@setImage="setImage"
			:image="restaurantForm.image"
		/>

		<input-field>
			<label for="address"> address. </label>
			<GMapAutocomplete
				required
				id="address"
				:placeholder="'Address'"
				@place_changed="setPlace"
				:value="restaurantForm.address?.formatted_address ?? ''"
			/>
		</input-field>

		<input-field>
			<label for="phone"> phone number. </label>
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
			<label for="website"> website. </label>
			<input
				type="text"
				v-model="restaurantForm.website"
				id="website"
				placeholder="Website"
			/>
		</input-field>

		<input-field>
			<label for="description"> Describe your restaurant </label>
			<textarea
				v-model="restaurantForm.description"
				id="description"
				placeholder="description"
			/>
		</input-field>

		<TimesForm :restaurantForm="restaurantForm" />

		<button class="button">
			Finish {{ props.editing ? "editing" : "adding" }} restaurant
		</button>
	</form>
</template>

<style lang="scss" scoped></style>
