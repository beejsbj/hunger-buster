<script setup>
	const props = defineProps(["review"]);
</script>

<template>
	<review-card>
		<header>
			<picture>
				<img :src="review.user.image" />
				<Skeleton />
			</picture>
			<text-content>
				<h3 class="firm-voice">{{ review.user.displayName }}</h3>
				<p>
					{{ new Date(review.date.seconds * 1000).toLocaleString() }}
				</p>
				<Skeleton />
			</text-content>
		</header>
		<p>
			<span>{{ "★".repeat(review?.rating) }}</span>
			<Skeleton />
		</p>
		<p>
			<span>{{ review?.content }}</span>
			<Skeleton />
		</p>
	</review-card>
</template>
<style lang="scss" scoped>
	review-card {
		display: grid;
		gap: 10px;
		background: white;
		color: black;
		padding: 20px;
		box-shadow: var(--shadow);
		border-radius: 10px;

		header {
			display: grid;
			grid-template-columns: 50px 1fr;
			gap: 10px;

			text-content {
				display: grid;
				grid-template-columns: 1fr 1fr;
				justify-content: space-between;
				padding-top: 10px;

				p {
					text-align: right;
				}
			}
		}
	}
</style>
