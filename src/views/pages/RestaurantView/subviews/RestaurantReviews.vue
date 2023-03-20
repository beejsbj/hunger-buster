<script setup>
	import AddReviewForm from "./RestaurantReviews/AddReviewForm.vue";

	const shop = useShopStore();
</script>

<template>
	<!-- template restaurant reviews -->
	<ul class="reviews-list">
		<li v-for="review in shop.reviews">
			<ReviewCard :review="review" />
		</li>
	</ul>
</template>
