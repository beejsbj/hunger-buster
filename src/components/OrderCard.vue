<script setup>
	const props = defineProps(["order"]);
</script>

<template>
	<order-card>
		<h1 class="solid-voice">Order #{{ order.id }}</h1>
		<p>
			{{ order.restaurant.name }}
		</p>
		<p>----------------------------------------------</p>
		<p>
			{{ order.restaurant.address.formatted_address }}
		</p>
		<template v-if="order.deliveryMethod == 'delivery'">
			<p>Delivered to {{ order.placedAt.formatted_address }}</p>
		</template>

		<p>----------------------------------------------</p>

		<details>
			<summary class="firm-voice">Items</summary>
			<ul>
				<li
					v-for="item in order.items"
					:key="item.id"
				>
					<p class="whisper-voice">
						{{ item.name }} x {{ item.quantity }}
					</p>
				</li>
			</ul>
		</details>
		<p>----------------------------------------------</p>

		<details class="price">
			<summary class="firm-voice">Total: ${{ order.total }}</summary>
			<text-content>
				<p class="whisper-voice">Subtotal: ${{ order.subtotal }}</p>
				<p class="whisper-voice">Tax: ${{ order.tax }}</p>
				<p class="whisper-voice">Delivery Fee: ${{ order.deliveryFee }}</p>
				<p
					class="whisper-voice"
					v-if="order.tip"
				>
					Tip: ${{ order.tip }}
				</p>
				<p
					class="whisper-voice"
					v-if="order.discount"
				>
					Discount: ${{ order.discount }}
				</p>

				<p class="whisper-voice">
					Payment Method: {{ order.paymentMethod }}
				</p>
			</text-content>
		</details>
	</order-card>
</template>

<style scoped>
	order-card {
		display: grid;
		gap: 10px;
		background: white;
		padding: 20px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	}

	details {
		display: grid;
		gap: 10px;
		position: relative;
		left: 10px;
	}

	details summary {
		cursor: pointer;
		list-style: none;
	}

	details::before {
		content: "";
		position: absolute;
		top: 50%;
		left: -15px;
		transform: translateY(-50%);
		width: 10px;
		height: 2px;
		background-color: black;
		transition: 0.2s ease-in;
	}

	details[open]::before {
		width: 2px;
		top: 0px;
		left: -10px;
		transform: translateY(0%);

		height: 100%;
	}

	details.price {
		display: grid;
		gap: 5px;
	}
	details :is(text-content, ul) {
		padding: 10px;
		display: grid;
		gap: 5px;
	}
</style>
