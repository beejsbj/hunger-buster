<script setup>
	defineProps(["profile"]);
	const user = useUserStore();
</script>


<template>
	<profile-banner>
		<h1 class="loud-voice">
			{{ profile?.displayName }}
			<span class="calm-voice">
				<RouterLink
					class="button"
					to="/user/edit"
					>Edit</RouterLink
				>
			</span>
		</h1>

		<picture class="profile-picture">
			<img
				:src="profile?.image"
				alt=""
			/>
		</picture>
		<!-- <button class="edit outline">Edit Image</button> -->
	</profile-banner>
</template>

<style lang="scss" scoped>
	profile-banner {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}
	h1 {
		position: relative;
		display: grid;
		align-content: start;
		justify-items: start;
		a {
			font-size: 14px;
		}
	}
</style>