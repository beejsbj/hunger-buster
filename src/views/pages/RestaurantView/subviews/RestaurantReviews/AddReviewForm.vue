<script setup>
	const props = defineProps(["order", "show"]);
	const shop = useShopStore();
	const user = useUserStore();
	const reviewForm = reactive({
		rating: 1,
		content: "",
		order: { ...props.order },
		id: props.order.id,
		date: new Date(),
		user: { id: user.id, ...user.profile },
	});
	function addReview() {
		console.log(reviewForm);
		shop.addReview(reviewForm);

		reviewForm.rating = 1;
		reviewForm.content = "";
	}
</script>

<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				class="modal-mask"
				v-if="show"
				@click.self="show = false"
			>
				<form
					@submit.prevent="
						show = false;
						addReview();
					"
				>
					<h3 class="firm-voice">Add your Review for #{{ order.id }}</h3>
					<input-field>
						<label for="rating">Rating: {{ reviewForm.rating }}</label>
						<input
							type="range"
							id="rating"
							v-model.number="reviewForm.rating"
							placeholder="Rating"
							min="1"
							max="5"
							step="1"
						/>
					</input-field>
					<input-field>
						<label for="content">Review</label>
						<textarea
							id="content"
							v-model="reviewForm.content"
							placeholder="Review"
						/>
					</input-field>
					<button type="submit">Add Review</button>
				</form>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	form {
		padding: 20px;
	}
</style>
