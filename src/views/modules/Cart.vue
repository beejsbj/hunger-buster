<script setup>
	import { computed } from "vue-demi";
	import Item from "./Item.vue";

	const db = useFirestore();
	const route = useRoute();
	const shop = useShopStore();

	const props = defineProps(["restaurant", "cartSize"]);

	const cartRef = computed(() => {
		return doc(collection(db, "carts"), `cart_${props.restaurant.id}`);
	});
	const cart = useDocument(cartRef);

	const total = computed(function () {
		return cart.value.items
			.reduce(function (total, item) {
				return total + item.price * item.quantity;
			}, 0)
			.toFixed(2);
	});
	//
	//
	//
	props.cartSize.value = computed(() => cart.value.items.length);
	//
	//
	//
	//
</script>

<template>
	<article v-if="cart">
		<h3 class="attention-voice">Total: ${{ total }}</h3>

		<table class="styled-table">
			<thead>
				<tr>
					<th>Item</th>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr :key="item.id" v-for="item in cart.items">
					<td>
						<picture><img :src="item.image" alt="" /></picture>
					</td>
					<td>
						<p>{{ item.name }}</p>
						<ul v-if="item.options">
							<li
								:key="selection.choice"
								v-for="selection in item.selections"
							>
								- {{ selection.choice }}
								<span v-if="selection.price"
									>: ${{ selection.price }}+</span
								>
							</li>
						</ul>
						<p class="note" v-if="item.note">
							{{ item.note }}
						</p>
					</td>
					<td>${{ item.totalPrice }}</td>
					<td>
						<button @click="shop.quantityDecrement(item)">-</button>
						{{ item.quantity }}
						<button @click="shop.quantityIncrement(item)">+</button>
					</td>
					<td>${{ item.totalPrice * item.quantity }}</td>
					<td>
						<!-- <button @click="item.show = !item.show">MORE</button> -->
						<button @click="shop.remove(item, restaurant)">Remove</button>
					</td>
					<Item :item="item" />
				</tr>
			</tbody>
		</table>
		<div class="buttons">
			<button @click="clearCart()">Clear Cart</button>
		</div>
	</article>
</template>

<style>
	article {
		display: grid;
		gap: 20px;
	}
	table,
	tbody {
		/*		width: 100%;*/
		display: grid;
		gap: 10px;
	}

	tr {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr;
		gap: 15px;
		align-items: center;
		/*		justify-items: center;*/
	}
	tr th {
		display: block;
		padding: 10px;
	}

	thead,
	tfoot {
		background-color: hsla(15, 19%, 60%, 1);
	}

	tbody tr:nth-of-type(even) {
		background-color: hsla(209, 39%, 48%, 1);
	}

	.flex-list {
		display: flex;
		gap: 5px;
		margin-bottom: 10px;
	}
	td li {
		font-size: 12px;
	}

	.note {
		font-size: 12px;
	}
</style>
