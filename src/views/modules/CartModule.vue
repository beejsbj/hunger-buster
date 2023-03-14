<script setup>
	//////////////////////////////////////////


	const shop = useShopStore();


	function optionSelected(option) {
		return option.choices.some(function (choice) {
			return choice.selected;
		});
	}




</script>


<template>
	<cart-module class="styled-cart-module">
			<h2 class="solid-voice">Items</h2>
			<TransitionGroup
				name="list"
				tag="ul"
				class="cart-items"
			>
				<li
					:key="item.id"
					v-for="item in shop.cart"
					class="item"
				>
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
							<span class="price small-voice"
								>${{ item.totalPrice }}</span
							>
						</h2>

						<TransitionGroup
							name="list"
							tag="ul"
							class="options"
							v-if="item.options"
						>
							<template v-for="option in item.options">
								<li
									:key="option.name"
									v-if="optionSelected(option)"
								>
									<p class="whisper-voice">
										{{ option.name }}
									</p>
									<ul class="choices">
										<template v-for="choice in option.choices">
											<li
												:key="choice.name"
												v-if="choice.selected"
												class="small-voice"
											>
												- {{ choice.name }}
												<span
													class="price"
													v-if="choice.price"
													>{{ choice.price }}</span
												>
											</li>
										</template>
									</ul>
								</li>
							</template>
						</TransitionGroup>

						<p
							class="note"
							v-if="item.note"
						>
							{{ item.note }}
						</p>
					</div>
					<div>
						<select @change="shop.updateQuantity(item)" v-model="item.quantity">
							<option class="remove">remove</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>

						

						
					</div>
				</li>
			</TransitionGroup>
			<button
				class="button clearcart"
				@click="shop.clearCart(cart)"
			>
				Clear Cart
			</button>
		</cart-module>
</template>

<style scoped>
	article {
		display: grid;
		gap: 20px;
	}
	cart-module,
	ul.cart-items {
		/*		width: 100%;*/
		display: grid;
		gap: 20px;
	}

	li.item {
		display: grid;
		grid-template-columns: 0.5fr 1fr 0.5fr;
		gap: 15px;
		align-items: center;
		justify-items: center;
	}



	div.name {
		display: grid;
		gap: 5px;
	}

	.note {
		font-size: 12px;
	}

	.quantity,
	.total {
		justify-self: center;
	}

	span.price {
		--highlight: green;
		color: var(--highlight);
	}

	button.clearcart {
		background-color: orange;
	}

	ul.options {
		display: grid;
		gap: 10px;
	}
	ul.choices {
		display: grid;
		gap: 5px;
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
