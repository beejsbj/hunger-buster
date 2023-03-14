<script setup>
	//////////////////////////////////////////

	const shop = useShopStore();
	const props = defineProps(["item"]);
</script>

<template>
	<li class="item">
		<div>
			<picture>
				<img
					:src="item.image"
					alt=""
				/>
			</picture>
		</div>
		<div class="name">
			<h2 class="firm-voice">
				{{ item.name }} -
				<span class="price small-voice">${{ item.totalPrice }}</span>
			</h2>

			<CartItemCardOptions :options="item.options" />

			<p
				class="note"
				v-if="item.note"
			>
				{{ item.note }}
			</p>
		</div>
		<div>
			<select
				@change="shop.updateQuantity(item)"
				v-model="item.quantity"
			>
				<option class="remove">remove</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>
		</div>
	</li>
</template>

<style scoped>
	li.item {
		display: grid;
		grid-template-columns: 0.5fr 1fr 0.5fr;
		gap: 15px;
		align-items: center;
		justify-items: center;
	}

	li.item + li.item {
		border-top: 1px solid hsla(0, 0%, 0%, 0.4);
		padding-top: 10px;
	}

	div.name {
		display: grid;
		gap: 5px;
	}

	.note {
		font-size: 12px;
	}

	span.price {
		--highlight: green;
		color: var(--highlight);
	}

	select {
		--highlight: orange;
		background-color: var(--highlight);
		color: white;
		border: none;
		padding: 5px;
		border-radius: 5px;
		/* justify-self: stretch; */
	}
</style>
