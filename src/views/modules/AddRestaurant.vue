
<script setup>
	import { useShopStore } from "../../stores/shop";
	const shop = useShopStore();

	const restaurantForm = reactive({
		name: "",
		image: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		website: "",
		notes: "",
	});

	function numberFormat(event) {
		if (event.key == "-" && isNaN(event.key) && event.key !== "Backspace") {
			console.log(event);
			restaurantForm.phone = restaurantForm.phone.slice(0, -1);
			return;
		}
		if (restaurantForm.phone.length == 3 || restaurantForm.phone.length == 7) {
			restaurantForm.phone += "-";
		}
	}
</script>

<template>
	<form @submit.prevent="shop.addRestaurant(restaurantForm)">
		<h1 class="attention-voice">Add a Restaurant</h1>
		<input-field>
			<input
				type="text"
				:required="false"
				v-model="restaurantForm.name"
				id="name"
				placeholder="Restaurant Name"
			/>
			<label for="name"> Enter restaurant's name. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="restaurantForm.image"
				id="image"
				placeholder="Image URL"
			/>
			<label for="image"> Enter restaurant's image URL. </label>
		</input-field>

		<input-field>
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
			<label for="phone"> Enter restaurant's phone number. </label>
		</input-field>

		<input-field>
			<input
				:required="false"
				type="text"
				v-model="restaurantForm.address"
				id="address"
				placeholder="Address"
			/>
			<label for="address"> Enter restaurant's address. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="restaurantForm.city"
				id="city"
				placeholder="City"
			/>
			<label for="city"> Enter restaurant's city. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="restaurantForm.state"
				id="state"
				placeholder="State"
			/>
			<label for="state"> Enter restaurant's state. </label>
		</input-field>

		<input-field>
			<input
				:required="false"
				type="text"
				v-model="restaurantForm.zip"
				id="zip"
				placeholder="Zip Code"
			/>
			<label for="zip"> Enter restaurant's zip code. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="restaurantForm.website"
				id="website"
				placeholder="Website"
			/>
			<label for="website"> Enter restaurant's website. </label>
		</input-field>

		<input-field>
			<textarea
				v-model="restaurantForm.notes"
				id="notes"
				placeholder="Notes"
			/>
			<label for="notes">
				Please enter any notes about the restaurant.
			</label>
		</input-field>

		<button class="button">Add restaurant</button>
	</form>
</template>