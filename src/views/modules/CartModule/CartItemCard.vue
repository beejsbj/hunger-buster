<script setup>
	//////////////////////////////////////////

	const shop = useShopStore();
	const props = defineProps(["item"]);
</script>

<template>
	<li class="item">
		<div class="item-info">
			<h2 class="firm-voice">
				{{ item.name }} —
				<span class="price small-voice">${{ item.totalPrice }}</span>
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
			</picture>
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
		grid-template-columns: 1fr 0.5fr;
		gap: 15px;
		justify-items: center;
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
		color: var(--highlight);
	}

	select {
		background-color: var(--highlight);
		color: white;
		border: none;
		padding: 5px;
		border-radius: 5px;
		/* justify-self: stretch; */
	}
</style>
