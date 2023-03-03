<script setup>
	defineProps(["profile"]);
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
				v-for="order in orders"
			>
				<!-- cart -->
				<!-- #TODO  -->
			</li>
		</TransitionGroup>
	</article>
</template>

<style scoped>
	article {
		display: grid;
		gap: 40px;
	}
	orders-list {
		display: grid;
		gap: 20px;
	}
</style>