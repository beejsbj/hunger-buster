<script setup>
	import homeIcon from "@/assets/icons/home.svg";
	import restaurantsIcon from "@/assets/icons/restaurant.svg";
	const deliveryOption = ref("delivery");
	const shop = useShopStore();
	const user = useUserStore();
	const props = defineProps(["order", "cart"]);
	props.order.deliveryMethod = computed(() => {
		return deliveryOption.value;
	});
</script>

<template>
	<checkout-module>
		<h1 class="attention-voice">
			<!-- {{ shop.restaurant.name }} -->
		</h1>
		<delivery-module>
			<h2 class="solid-voice">Delivery</h2>

			<delivery-option>
				<input-field>
					<input
						type="radio"
						v-model="deliveryOption"
						id="delivery"
						value="delivery"
					/>
					<label for="delivery"> Delivery </label>
				</input-field>
				<input-field>
					<input
						type="radio"
						v-model="deliveryOption"
						id="pickup"
						value="pickup"
					/>
					<label for="pickup"> Pickup </label>
				</input-field>
			</delivery-option>
			<map-view>
				<GMapMap
					v-if="deliveryOption === 'pickup'"
					:center="shop.restaurant.address.location"
					:zoom="14"
					map-type-id="terrain"
					style="height: 300px"
					:draggable="false"
				>
					<GMapCluster>
						<GMapMarker
							:position="shop.restaurant.address.location"
							:clickable="false"
							:icon="{
								url: restaurantsIcon,
								scaledSize: { width: 60, height: 60 },
							}"
						/>
					</GMapCluster>
				</GMapMap>
				<GMapMap
					v-if="deliveryOption === 'delivery'"
					:draggable="false"
					:center="{
						lat:
							(shop.restaurant.address.location.lat +
								user.address.location.lat) /
							2,
						lng:
							(shop.restaurant.address.location.lng +
								user.address.location.lng) /
							2,
					}"
					:zoom="13"
					map-type-id="terrain"
					style="height: 300px"
				>
					<GMapCluster>
						<GMapMarker
							:position="shop.restaurant.address.location"
							:clickable="false"
							:icon="{
								url: restaurantsIcon,
								scaledSize: { width: 60, height: 60 },
							}"
						/>
						<GMapMarker
							:position="user.address.location"
							:clickable="false"
							:icon="{
								url: homeIcon,
								scaledSize: { width: 60, height: 60 },
							}"
						/>
					</GMapCluster>
				</GMapMap>
			</map-view>
		</delivery-module>
	</checkout-module>
	<div class="buttons">
		<RouterLink
			:to="`cart`"
			class="button"
			>Back to Cart</RouterLink
		>
		<button
			class="button"
			@click="user.placeOrder(order)"
		>
			Place Order
		</button>
	</div>
</template>

<style scoped>
	delivery-option {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
	}
	/* change label background color if input is checked use :has */
	delivery-option input {
		display: none;
	}
	delivery-option label {
		cursor: pointer;
		text-align: center;
	}
	delivery-option input:checked + label {
		background-color: var(--highlight);
	}

	.vue-map button {
		display: none;
	}

	checkout-module {
		display: grid;
		gap: 20px;
	}
</style>

