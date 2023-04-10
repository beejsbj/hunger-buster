<script setup>
	import FavoriteButton from "./FavoriteButton.vue";
	import IconHeart from "./icons/IconHeart.vue";

	const user = useUserStore();
	const props = defineProps(["restaurant"]);
	const found = computed(() =>
		user.profile?.favoriteRestaurants?.find(function (favorite) {
			return favorite.id == props.restaurant.id;
		})
	);
</script>

<template>
	<restaurant-card>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
			<Skeleton :pill="true" />
		</picture>
		<text-content>
			<h2 class="solid-voice">
				{{ restaurant.name }}
			</h2>
			<p class="price-level">{{ "$".repeat(restaurant.priceLevel) }}</p>

			<Skeleton :pill="true" />
		</text-content>
		<div class="buttons">
			<RouterLink
				class="button outline"
				:to="'/restaurant/' + restaurant.id"
			>
				MORE
			</RouterLink>
			<Skeleton :pill="true" />
		</div>
		<FavoriteButton :restaurant="restaurant" />
	</restaurant-card>
</template>

<style lang="scss" scoped>
	restaurant-card {
		display: grid;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.01);

		h2 {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 140px;
		}
	}
	restaurant-card div.buttons {
		display: grid;
		align-items: end;
		gap: 20px;
	}

	restaurant-card picture {
		aspect-ratio: 1 / 1;
	}
	restaurant-card img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}

	text-content {
		display: flex;
		justify-content: space-between;
	}

	.price-level {
		color: yellowgreen;
	}

	restaurant-card {
		position: relative;

		button.favorite {
			position: absolute;
			top: 0px;
			right: 0px;

			width: 35px;
			height: 35px;
			border-radius: 50%;

			padding-top: 6px;

			@media (min-width: 450px) {
				top: 10px;
				right: 10px;
				box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
			}
		}
	}

	@media (max-width: 450px) {
		restaurant-card {
			grid-template-columns: 0.4fr 1fr;
		}
		restaurant-card picture {
			grid-row: span 2;
		}
	}
</style>
