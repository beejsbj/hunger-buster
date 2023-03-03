<script setup>
	defineProps(["profile"]);
	const user = useUserStore();

	const editing = reactive({
		name: false,
		image: false,
	});

	//to refocus
	const disName = ref(null);
	function reFocus() {
		nextTick(() => {
			disName.value.focus();
			disName.value.select();
		});
	}
</script>


<template>
	<profile-banner>
		<form class="edit">
			<h1
				@click.prevent="notify(profile?.displayName)"
				class="loud-voice"
			>
				<span v-if="!editing.name">
					{{ profile?.displayName }}
				</span>
				<input
					type="text"
					v-model.lazy="profile.displayName"
					v-if="editing.name"
					placeholder="Display Name"
					ref="disName"
					id="displayName"
				/>
			</h1>
			<button
				class="edit outline button"
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
				:src="profile?.image"
				alt=""
			/>
			<form>
				<button
					class="edit outline button"
					@click.prevent="editing.image = !editing.image"
				>
					<span v-if="!editing.image">Edit Image</span>
					<span
						v-if="editing.image"
						@click.prevent="
							profile.image = 'https://peprojects.dev/images/square.jpg'
						"
						>Cancel</span
					>
				</button>
				<input
					type="text"
					v-model.lazy="profile.image"
					v-if="editing.image"
					placeholder="image url"
				/>
			</form>
		</picture>
		<!-- <button class="edit outline">Edit Image</button> -->
	</profile-banner>
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

	// .profile-picture {
	// 	img {
	// 		// object-fit: cover;
	// 	}
	// }
</style>