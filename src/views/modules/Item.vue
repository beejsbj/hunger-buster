<script setup>
	const user = useUserStore();

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();
	const cart = useCartsStore();

	const props = defineProps(["item"]);
	const found = computed(() =>
		user.profile?.favoriteItems?.find(function (favorite) {
			return favorite.id == props.item.id;
		})
	);

	// console.log(item);

	const note = ref("");
</script>

<template>
	<Transition name="fade">
		<item-wrapper
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
						:class="{ favorite: found ? true : false }"
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
