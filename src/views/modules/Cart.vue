<script setup>
	//////////////////////////////////////////

	import { computed } from "vue";

	const shop = useShopStore();
	const props = defineProps(["restaurant", "cart"]);

	const taxRate = ref(0.13);

	const order = reactive({
		restaurant: props.restaurant,
		tip: 5,
		deliveryFee: 0,
	});

	order.items = computed(() => {
		return props.cart;
	});

	order.tax = computed(() => {
		return shop.cartTotal * taxRate.value;
	});

	order.subtotal = computed(() => {
		return Number(shop.cartTotal).toFixed(2);
	});

	order.total = computed(() => {
		return (
			Number(shop.cartTotal) +
			Number(order.tip) +
			Number(order.tax)
		).toFixed(2);
	});

	//////////////////////////////////////////
</script>

<template>
	<article v-if="cart?.length">
		<table class="styled-table">
			<thead>
				<tr>
					<th>Item</th>
					<th>Name</th>
					<th>Price</th>
					<!-- <th>Quantity</th> -->

					<th></th>
				</tr>
			</thead>

			<TransitionGroup
				name="list"
				tag="tbody"
			>
				<tr
					:key="item.id"
					v-for="item in cart"
				>
					<td>
						<picture
							><img
								:src="item.image"
								alt=""
						/></picture>
					</td>
					<td>
						<h2 class="solid-voice">{{ item.name }}</h2>

						<TransitionGroup
							name="list"
							tag="ul"
							v-if="item.options"
						>
							<li
								v-for="option in item.options"
								:key="option.name"
							>
								<p>
									<em>
										{{ option.name }}
									</em>
								</p>
								<ul>
									<template v-for="choice in option.choices">
										<li
											:key="choice.name"
											v-if="choice.selected"
										>
											- {{ choice.name }}
											<span
												class="choice-price"
												v-if="choice.price"
												>{{ choice.price }}</span
											>
										</li>
									</template>
								</ul>
							</li>
						</TransitionGroup>

						<p
							class="note"
							v-if="item.note"
						>
							{{ item.note }}
						</p>
					</td>
					<td>${{ item.price.toFixed(2) }}</td>
					<!-- <td class="quantity">
						<button
							class="button"
							@click="shop.decrementQuantity(item)"
						>
							-
						</button>
						{{ item.quantity }}
						<button
							class="button"
							@click="shop.incrementQuantity(item)"
						>
							+
						</button>
					</td> -->
					<td>
						<!-- <button @click="item.show = !item.show">MORE</button> -->
						<button
							class="button remove"
							@click="shop.remove(item)"
						>
							Remove
						</button>
					</td>
				</tr>
			</TransitionGroup>
			<button
				class="button clearcart"
				@click="shop.clearCart(cart)"
			>
				Clear Cart
			</button>
		</table>

		<PaymentComponent
			:cart="cart"
			:order="order"
		/>
		<CheckoutPage
			:cart="cart"
			:order="order"
		/>
		<div class="buttons">
			<RouterLink
				class="button hide"
				:to="`/restaurant/${restaurant.id}/checkout`"
			>
				Checkout • ${{ order.total }}
			</RouterLink>
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
		grid-template-columns: 1fr 1fr 1fr 0.5fr;
		gap: 15px;
		align-items: center;
		justify-items: center;
	}
	tr th {
		display: block;
		padding: 10px;
	}

	thead,
	tfoot {
		background-color: hsla(15, 19%, 60%, 1);
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

	.quantity,
	.total {
		justify-self: center;
	}

	span.choice-price {
		color: var(--highlight);
	}

	button.clearcart {
		background-color: orange;
	}
</style>
