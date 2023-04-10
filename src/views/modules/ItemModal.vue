<script setup>
	const user = useUserStore();
	const shop = useShopStore();
	const props = defineProps(["item"]);

	const isFavorite = computed(() => {
		const found = user.profile?.favoriteItems?.find(function (favorite) {
			return favorite.id == props.item.id;
		});

		if (found) {
			return true;
		}
		return false;
	});
</script>

<template>
	<Transition name="modal">
		<div
			class="modal-mask"
			v-if="item.show"
			@click.self="item.show = !item.show"
		>
			<item-detail>
				<item-banner>
					<text-content>
						<h1 class="firm-voice">{{ item.name }}</h1>
						<p>${{ item.price }}</p></text-content
					>

					<FavoriteButton :item="item" />
					<!-- <button
					class="button close"
					@click="item.show = false"
				>
					Close
				</button> -->

					<picture>
						<img
							:src="item.image"
							alt=""
						/>
					</picture>
				</item-banner>

				<form
					@submit.prevent="
						item.show = !item.show;
						shop.add(item);
					"
				>
					<Options :options="item.options" />

					<input-field>
						<textarea
							v-model="item.note"
							placeholder="Add notes for your order"
						></textarea>
					</input-field>
					<div class="buttons">
						<button class="button">Add Item to Cart</button>
					</div>
				</form>
			</item-detail>
		</div>
	</Transition>
</template>

<style lang="scss" scoped>
	item-detail {
		display: grid;
		/*	grid-template-columns: 1fr 0.3fr;*/
		gap: 10px;

		item-banner {
			display: grid;
			grid-template-columns: 1fr 0.3fr;
			gap: 10px;
		}
	}

	item-detail > div {
		display: flex;
		justify-content: space-between;
	}

	a {
		color: var(--highlight);
	}

	label {
		display: grid;
		.price {
			color: green;
		}
	}

	textarea {
		width: 100%;
	}

	item-detail {
		padding: 20px;
		background: var(--paper);
	}
</style>
