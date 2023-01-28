<script setup>
	import { reactive, ref } from "vue";
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

	var selections = ref({});
	const multiSelections = ref([]);

	function addSelections() {
		var allSelections = Object.values(selections.value);
		allSelections.push(...multiSelections.value);
		item.selections = allSelections;
		// return allSelections;
	}
</script>

<template>
	<pre>
		<code>
			{{item}}
		</code>
	</pre>
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

		<form
			@submit.prevent="
				shop.add(item, restaurant);

				addSelections();
				redirect();
			"
		>
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
								<span>{{ choice.name }}</span>
								<span
									class="price"
									v-if="choice.priceIncrease"
									>${{ choice.priceIncrease }}</span
								>
							</label>
							<input
								v-if="option.required"
								:name="option.name"
								type="radio"
								:value="
									true
										? {
												option: option.name,
												choice: choice.name,
												price: choice.priceIncrease,
										  }
										: ''
								"
								v-model="selections[option.name]"
								required
							/>
							<input
								v-if="!option.required"
								type="checkbox"
								:value="
									true
										? {
												option: option.name,
												choice: choice.name,
												price: choice.priceIncrease,
										  }
										: ''
								"
								v-model="multiSelections"
							/>
						</li>
					</ul>
				</li>
			</ul>
			{{ selections }}
			{{ multiSelections }}
			<div>
				<button>Add Item to Cart</button>
			</div>
		</form>
	</item-card>
</template>

<style lang="scss" scoped>
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
	h2 span {
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
	label {
		display: grid;
		.price {
			color: green;
		}
	}

	.choice {
		display: flex;
		justify-content: space-between;
		input {
			width: 20px;
		}
	}
</style>
