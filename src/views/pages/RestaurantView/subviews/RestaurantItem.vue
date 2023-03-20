<script setup>
	const user = useUserStore();
	const route = useRoute();
	const shop = useShopStore();

	const item = computed(() => {
		return shop.items.find(function (item) {
			return item.id == route.params.itemSlug;
		});
	});

	const editing = ref(false);
</script>

<template>
	<item-detail v-if="item && !editing">
		<item-banner>
			<text-content>
				<h1 class="attention-voice">{{ item.name }}</h1>
				<p>${{ item.price }}</p>
				<p
					class="whisper-voice"
					v-if="item.description"
				>
					{{ item.description }}
				</p>

				<FavoriteButton
					:position="'static'"
					:item="item"
				/>
			</text-content>
			<picture>
				<img
					:src="item.image"
					alt=""
				/>
			</picture>
		</item-banner>

		<form @submit.prevent="shop.add(item)">
			<Options :options="item.options" />

			<input-field>
				<textarea
					v-model="item.note"
					placeholder="Add notes for your order"
				></textarea>
			</input-field>
			<div class="buttons">
				<button class="button outline">Add Item to Cart</button>
				<div
					class="buttons"
					v-if="user.isBusinessOwner"
				>
					<button
						class="button"
						@click.prevent="editing = true"
					>
						Edit Item
					</button>

					<button
						class="button danger"
						@click.prevent="shop.delete(item)"
					>
						Permanantly Delete Item
					</button>
				</div>
			</div>
		</form>
	</item-detail>

	<CreateItem
		v-if="item && editing"
		:item="item"
		:editing="editing"
		@close="editing = false"
	/>
</template>

<style lang="scss" scoped>
	item-banner {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		gap: 10px;
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
		color: var(--highlight);
	}

	.options > *:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.4);
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

	item-detail {
		padding: 20px;
		background: var(--paper);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
