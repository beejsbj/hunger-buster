<script setup>
	defineProps(["profile"]);
	const user = useUserStore();
</script>
<template>
	<article>
		<h2 class="attention-voice">Order History</h2>

		<TransitionGroup
			name="list"
			tag="ul"
			class="orders-list"
		>
			<li
				:key="order.id"
				v-for="order in user.orders"
			>
				<!-- <ShowCode :code="order" /> -->
				<OrderCard :order="order" />
				<!-- #todo -->
			</li>
		</TransitionGroup>
	</article>
</template>

<style scoped>
	article {
		display: grid;
		gap: 40px;
	}
	.orders-list {
		display: grid;
		gap: 20px;
	}
</style>