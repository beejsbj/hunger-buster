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
				<h1 class="loud-voice">{{ item.name }}</h1>
				<div>
					<p>${{ item.price }}</p>

					<button
						class="button"
						@click="user.favoriteItem(item)"
						:class="{ favorite: isFavorite }"
					>
						♡
					</button>
					<button
						class="button close"
						@click="item.show = false"
					>
						Close
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
					<div>
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

	div {
		@media (min-width: 600px) {
			button.close {
				display: none;
			}
		}

		@media (min-width: 900px) {
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
