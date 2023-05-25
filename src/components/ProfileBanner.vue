<script setup>
	defineProps(["profile"]);
	const user = useUserStore();
</script>

<template>
	<profile-banner>
		<h1 class="loud-voice">
			<span>{{ profile?.displayName }}</span>
			<Skeleton />
		</h1>

		<picture class="profile-picture">
			<img
				:src="profile?.image"
				alt=""
			/>
			<Skeleton />
		</picture>
		<!-- <button class="edit outline">Edit Image</button> -->
	</profile-banner>
</template>

<style lang="scss" scoped>
	profile-banner {
		display: grid;
		grid-template-columns: 1fr 0.2fr;
	}
	h1 {
		position: relative;
		display: grid;
		align-content: start;
		justify-items: start;
		justify-self: start;
		align-self: start;
		a {
			font-size: 14px;
		}
	}

	profile-banner picture {
		aspect-ratio: 1 / 1;
	}
</style>
