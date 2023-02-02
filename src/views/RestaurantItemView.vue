<script setup>
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useShopStore } from "../stores/shop.js";
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	defineProps({
		item: Object,
	});

	const note = ref("");
	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});

	function redirect() {
		router.push({
			path: `/restaurant/${route.params.restaurantSlug}/cart`,
		});
	}

	var selections = ref({});
	const multiSelections = ref([]);
	var allSelections;
	function addSelections() {
		allSelections = Object.values(selections.value);
		allSelections.push(...multiSelections.value);
		// props.item.selections = allSelections;
		// return allSelections;
	}
</script>

<template>
	<item-detail>
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
				addSelections();
				item.selections = allSelections;
				item.show = !item.show;
				shop.add(item, restaurant, note);
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
			<!-- 			{{ selections }}
			{{ multiSelections }} -->
			<input-field>
				<textarea
					v-model="note"
					placeholder="Add notes for your order"
				></textarea>
			</input-field>
			<div>
				<button>Add Item to Cart</button>
			</div>
		</form>
	</item-detail>
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

	item-detail {
		display: grid;
		/*	grid-template-columns: 1fr 0.3fr;*/
		gap: 10px;
	}

	item-detail > div {
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
	textarea {
		width: 100%;
	}
</style>
