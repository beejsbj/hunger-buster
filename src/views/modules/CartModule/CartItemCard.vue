<script setup>
	//////////////////////////////////////////

	const shop = useShopStore();
	const props = defineProps(["item"]);
</script>

<template>
	<li class="item">
		<div class="item-info">
			<h2 class="firm-voice">
				<span>{{ item.name }} —</span>
				<span class="price small-voice">${{ item.totalPrice }}</span>
				<Skeleton :pill="true" />
			</h2>

			<CartItemCardOptions :options="item.options" />

			<p
				class="small-voice"
				v-if="item.note"
			>
				{{ item.note }}
			</p>
		</div>
		<div>
			<picture>
				<img
					:src="item.image"
					alt=""
				/>
				<Skeleton :pill="true" />
			</picture>
		</div>

		<div>
			<select
				@change="shop.updateQuantity(item)"
				v-model="item.quantity"
			>
				<option
					class="remove"
					value="0"
				>
					remove
				</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>
			<Skeleton :pill="true" />
		</div>
	</li>
</template>

<style scoped>
	li.item {
		display: grid;
		grid-template-columns: 1fr 0.5fr;
		gap: 15px;
		justify-items: center;
		align-items: center;
	}

	li.item picture {
		aspect-ratio: 1 / 1;
	}

	li.item + li.item {
		border-top: 1px solid hsla(0, 0%, 0%, 0.4);
		padding: 20px 0;
	}

	div.item-info {
		display: grid;
		gap: 10px;
		grid-row: span 2;
		justify-self: start;
	}

	span.price {
		--highlight: green;
		color: var(--highlight);
	}

	select {
		background-color: var(--highlight);
		color: white;
		border: none;
		padding: 5px;
		border-radius: var(--corners);
		/* justify-self: stretch; */
	}
</style>
