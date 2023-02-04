<script setup>
	import { reactive } from "vue";
	import { RouterLink, RouterView, useRoute } from "vue-router";

	defineProps({
		user: Object,
	});

	const editing = reactive({
		name: false,
		image: false,
	});
</script>
<template>
	<profile-view>
		<header class="profile">
			<nav>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink to="/user/favorites">Favorties</RouterLink>
			</nav>
		</header>
		<profile-banner>
			<form class="edit">
				<h1 class="loud-voice">
					<span v-if="!editing.name">{{
						user.displayName ?? "Display Name"
					}}</span>
					<input
						type="text"
						v-model="user.displayName"
						v-if="editing.name"
						placeholder="Display Name"
						ref="name"
					/>
				</h1>
				<button
					class="edit outline"
					@click.prevent="editing.name = !editing.name"
				>
					<span v-if="!editing.name">Edit Name</span>
					<span v-if="editing.name">Close</span>
				</button>
			</form>
			<picture>
				<img
					:src="
						user.photoURL ?? 'https://peprojects.dev/images/square.jpg'
					"
					alt=""
				/>
				<form>
					<button
						class="edit outline"
						@click.prevent="editing.image = !editing.image"
					>
						<span v-if="!editing.image">Edit Image</span>
						<span
							v-if="editing.image"
							@click.prevent="
								user.photoURL =
									'https://peprojects.dev/images/square.jpg'
							"
							>Cancel</span
						>
					</button>
					<input
						type="text"
						v-model="user.photoURL"
						v-if="editing.image"
						placeholder="image url"
					/>
				</form>
			</picture>
			<!-- <button class="edit outline">Edit Image</button> -->
		</profile-banner>

		<sub-view>
			<RouterView />
		</sub-view>
	</profile-view>
</template>
<style lang="scss" scoped>
	profile-banner {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}
	form.edit {
		position: relative;
		display: grid;
		// align-items: start;
		align-content: start;
		justify-items: start;
		button {
			// position: absolute;
			font-size: 14px;
			// top: 0;
			// right: 0;
		}
		input {
			all: inherit;
		}
	}

	picture {
		display: relative;
		form {
			display: absolute;
		}
	}
</style>
