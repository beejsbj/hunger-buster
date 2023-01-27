<script setup>
	import { reactive } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useShopStore } from "../stores/shop.js";
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});
	const item = restaurant.menuItems.find(function (item) {
		return (
			route.params.itemSlug == item.id || route.params.itemSlug == item.slug
		);
	});

	function redirect() {
		router.push({
			path: `/${route.params.restaurantSlug}/cart`,
		});
	}

	const selections = reactive({});
	function addSelections() {
		item.selections = selections;
	}
</script>

<template>
	<item-card>
		<h1 class="loud-voice">{{ restaurant.name }}: {{ item.name }}</h1>
		<div>
			<p>${{ item.price }}</p>

			<button
				@click="user.favoriteItem(item)"
				:class="{
					favorite: user.profile.favoriteItems.includes(item),
				}"
			>
				Heart
			</button>
		</div>
		<picture>
			<img
				:src="item.image"
				alt=""
			/>
		</picture>

		<ul class="options">
			<li
				class="options-card"
				v-for="option in item.options"
			>
				<h2 class="attention-voice">
					Please Select the {{ option.name }}
					<span v-if="option.required">required</span>
				</h2>
				<ul class="choices">
					<li
						class="choice"
						v-for="choice in option.choices"
					>
						<label for="">
							{{ choice.name }}
						</label>
						<input
							v-if="option.required"
							:name="option.name"
							type="radio"
							:value="true ? { choice: choice.name } : ''"
							v-model="selections[option.name]"
							required
						/>
						<input
							v-if="!option.required"
							type="checkbox"
							:value="true ? { choice: choice.name } : ''"
							v-model="selections"
						/>
					</li>
				</ul>
			</li>
		</ul>
		{{ selections }}
		<div>
			<button
				@click="
					shop.add(item, restaurant);

					addSelections();
					redirect();
				"
			>
				Add Item to Cart
			</button>
		</div>
	</item-card>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 5px;
	}
	restaurant-card div {
		display: flex;
		justify-content: space-between;
	}

	item-card {
		display: grid;
		/*	grid-template-columns: 1fr 0.3fr;*/
		gap: 10px;
	}

	item-card > div {
		display: flex;
		justify-content: space-between;
	}

	a {
		color: salmon;
	}
	span {
		display: block;
		color: red;
		font-size: 14px;
	}
	.options > *:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.4);
	}
	button.favorite {
		background: yellow;
	}
</style>
