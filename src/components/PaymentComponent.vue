<script setup>
	//////////////////////////////////////////

	const user = useUserStore();
	const props = defineProps(["cart", "order"]);

	const tipPercent = ref(5);

	props.order.tip = computed(() => {
		return ((props.order.subtotal * tipPercent.value) / 100).toFixed(2);
	});

	//////////////////////////////////////////
</script>

<template>
	<payment-module>
		<h2 class="solid-voice">Payment</h2>

		<TransitionGroup
			name="list"
			tag="ul"
			class="payment-list"
		>
			<li class="subtotal">
				<p>Subtotal</p>
				<p>${{ order.subtotal }}</p>
				<Skeleton />
			</li>

			<li class="tax">
				<p>Taxes and Other fees</p>
				<p>${{ order.tax.toFixed(2) }}</p>
				<Skeleton />
			</li>
			<li class="tip">
				<p>Tip</p>
				<radio-list>
					<input-field>
						<input
							type="radio"
							v-model.number="tipPercent"
							value="5"
							id="tip5"
						/>
						<label for="tip5">05%</label>
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
				<Skeleton />
			</li>

			<li class="deliveryfee">
				<p>Delivery Fee</p>
				<Transition name="list">
					<p v-if="order.deliveryMethod == 'delivery'">
						$<span>{{ order.deliveryFee }}</span>
						<Skeleton />
					</p>
					<p v-else>$<s>0</s> <Skeleton /></p
				></Transition>
			</li>

			<li class="order-total">
				<p>Total</p>
				<Transition name="list">
					<p v-if="order.deliveryMethod == 'delivery'">
						$<span>{{ order.total }}</span>
						<Skeleton />
					</p>
					<p v-else>
						$<span>{{ order.total }}</span> <Skeleton /></p
				></Transition>
			</li>

			<!-- add a tip -->
		</TransitionGroup>

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

<style lang="scss" scoped>
	payment-module {
		display: grid;
		gap: 10px;
	}

	ul {
		display: grid;
		gap: 15px;

		li {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		radio-list {
			display: flex;
			gap: 10px;

			input-field {
				padding: 0;

				input {
					display: none;

					&:checked + label {
						background-color: var(--highlight);
						filter: invert(1);
					}
				}

				label {
					display: block;
					padding: 5px;
					border: 1px solid var(--highlight);
					border-radius: var(--corners);
				}
			}
		}
	}
</style>
