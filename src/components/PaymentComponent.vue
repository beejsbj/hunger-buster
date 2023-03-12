<script setup>
	//////////////////////////////////////////

	const user = useUserStore();
	const props = defineProps(["restaurant", "cart", "order"]);

	const tipPercent = ref(5);

	props.order.tip = computed(() => {
		return ((props.order.subtotal * tipPercent.value) / 100).toFixed(2);
	});

	//////////////////////////////////////////
</script>

<template>
	<payment-module>
		<h2 class="solid-voice">Payment</h2>

		<payment-table>
			<div class="subtotal">
				<p>Subtotal</p>
				<p>${{ order.subtotal }}</p>
			</div>
			<div class="deliveryfee">
				<p>Delivery Fee</p>
				<p>${{ order.deliveryFee }}</p>
			</div>

			<div class="tax">
				<p>Taxes and Other fees</p>
				<p>${{ order.tax.toFixed(2) }}</p>
			</div>
			<div class="tip">
				<p>Tip</p>
				<radio-list>
					<input-field>
						<input
							type="radio"
							v-model.number="tipPercent"
							value="5"
							id="tip5"
						/>
						<label for="tip5">5%</label>
					</input-field>
					<input-field>
						<input
							type="radio"
							v-model.number="tipPercent"
							value="10"
							id="tip10"
						/>
						<label for="tip10">10%</label>
					</input-field>
					<input-field>
						<input
							type="radio"
							v-model.number="tipPercent"
							value="15"
							id="tip15"
						/>
						<label for="tip15">15%</label>
					</input-field>
				</radio-list>
			</div>

			<div class="order-total">
				<p>Total</p>
				<p>${{ order.total }}</p>
			</div>

			<!-- add a tip -->
		</payment-table>

		<payment-method>
			<h2 class="firm-voice">Payment Method</h2>
			<card-view>
				<card-field
					v-for="card in user?.cards"
					:key="card?.id"
					:card="card"
				/>
			</card-view>
			<add-card>
				<add-card-field />
			</add-card>
		</payment-method>
	</payment-module>
</template>

<style scoped>
	payment-module {
		display: grid;
		gap: 10px;
	}

	payment-table {
		display: grid;
		gap: 10px;
	}
	payment-table div {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	payment-table radio-list {
		display: flex;
		gap: 10px;
	}

	payment-table radio-list input-field {
		padding: 0;
	}

	payment-table radio-list input {
		display: none;
	}
	payment-table radio-list input:checked + label {
		background-color: var(--highlight);
	}
</style>