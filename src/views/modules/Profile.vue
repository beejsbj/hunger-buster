<script setup>
	import { reactive, ref, nextTick } from "vue";
	import { RouterLink, RouterView } from "vue-router";
	import { useUserStore } from "../../stores/user.js";

	const user = useUserStore();

	const editing = reactive({
		name: false,
		image: false,
	});

	const displayName = ref(null);
	function reFocus() {
		nextTick(() => {
			displayName.value.focus();
			displayName.value.select();
		});
	}
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
						user.current.displayName ?? "Display Name"
					}}</span>
					<input
						type="text"
						v-model="user.current.displayName"
						v-if="editing.name"
						placeholder="Display Name"
						ref="displayName"
						id="displayName"
					/>
				</h1>
				<button
					class="edit outline"
					@click.prevent="
						editing.name = !editing.name;
						if (editing.name) {
							reFocus();
						}
					"
				>
					<span v-if="!editing.name">Edit Name</span>
					<span v-if="editing.name">Close</span>
				</button>
			</form>

			<picture class="profile-picture">
				<img
					:src="user.current.photoURL"
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
								user.current.photoURL =
									'https://peprojects.dev/images/square.jpg'
							"
							>Cancel</span
						>
					</button>
					<input
						type="text"
						v-model="user.current.photoURL"
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

	.profile-picture {
		img {
			// object-fit: cover;
		}
	}
</style>
