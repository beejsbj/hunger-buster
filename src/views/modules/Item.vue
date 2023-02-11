<script setup>
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useShopStore } from "../../stores/shop.js";
	import { useUserStore } from "../../stores/user.js";
	import Options from "../../components/Options.vue";
	const user = useUserStore();

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	defineProps({
		item: Object,
	});

	// console.log(item);

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
	}
</script>

<template>
	<Transition @after-enter="onAfterEnter" name="fade">
		<item-wrapper v-if="item.show" @click.self="item.show = !item.show">
			<item-detail>
				<h1 class="loud-voice">{{ item.name }}</h1>
				<div>
					<p>${{ item.price }}</p>

					<button
						@click="user.favoriteItem(item)"
						:class="{
							favorite: user.profile.favoriteItems.includes(item),
						}"
					>
						♡
					</button>
					<button class="close" @click="item.show = false">Close</button>
				</div>
				<picture>
					<img :src="item.image" alt="" />
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
					<Options :options="item.options" />

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
		</item-wrapper>
	</Transition>
</template>

<style lang="scss" scoped>
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
		color: var(--highlight);
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

	item-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: hsla(212, 23%, 11%, 0.6);
		overflow-x: hidden;
		padding: 10px;

		@media (min-width: 600px) {
			padding: 100px;
			button.close {
				display: none;
			}
		}

		@media (min-width: 900px) {
			padding: 60px 30vw;
		}
	}

	item-detail {
		padding: 20px;
		background: var(--paper);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
