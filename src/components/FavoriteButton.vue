<script setup>
	const props = defineProps(["restaurant", "item", "position"]);
	const user = useUserStore();

	function onClick() {
		if (props.restaurant) {
			user.favoriteRestaurant(props.restaurant);
		} else if (props.item) {
			user.favoriteItem(props.item);
		}
	}

	const favorited = computed(function () {
		if (props.restaurant) {
			return user?.isRestaurantFavorite(props.restaurant);
		} else if (props.item) {
			return user?.isItemFavorite(props.item);
		}
	});
</script>

<template>
	<button
		class="button favorite"
		:class="{ favorited: favorited }"
		@click="onClick"
	>
		<picture>
			<IconHeart />
		</picture>
		<Skeleton :pill="true" />
	</button>
</template>

<style lang="scss">
	* {
		&:has(> .favorite) {
			position: relative;

			& > button.favorite {
				position: v-bind("position ?? 'absolute'");
				top: 0px;
				right: 0px;

				width: 35px;
				height: 35px;
				border-radius: 50%;

				padding-top: 6px;
				box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

				@media (min-width: 450px) {
					top: 10px;
					right: 10px;
				}
			}
		}
	}
</style>
