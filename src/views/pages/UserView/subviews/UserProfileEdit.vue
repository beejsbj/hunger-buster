
<script setup>
	import { useFirebaseStorage, useStorageFile, useStorageFileUrl } from "vuefire";
	import { ref as storageRef } from "firebase/storage";

	const user = useUserStore();
	const storage = useFirebaseStorage();
	const props = defineProps(["profile"]);

	const form = reactive({
		name: props?.profile?.displayName ?? "",
		image: false,
		description: props?.profile?.description ?? "",
	});

	//upload image and set profile.image to the url

	function setImage(file) {
		form.image = file;
	}

	async function upload(form) {
		if (!form.image) {
			return;
		}
		const imageRef = storageRef(storage, `images/users/${user.id}/thumbnail`);
		const { upload, url, refresh } = useStorageFile(imageRef);
		await upload(form.image);
		await refresh();

		props.profile.image = url.value;

		form.image = "";
	}

	function updateName() {
		props.profile.displayName = form.name;
	}

	function updateDescription() {
		props.profile.description = form.description;
	}
</script>

<template>
	<profile-form>
		<h1 class="attention-voice">Edit Profile</h1>

		<form @submit.prevent="updateName()">
			<input-field>
				<label for="name"> Enter your name. </label>
				<input
					type="text"
					id="name"
					v-model="form.name"
				/>
			</input-field>
			<button class="button">Change Name</button>
		</form>
		<form
			@submit.prevent="upload(form)"
			enctype="multipart/form-data"
		>
			<FileUpload
				v-if="profile?.image"
				@setImage="setImage"
				:image="profile.image"
			/>

			<button class="button">Upload</button>
		</form>

		<form @submit.prevent="updateDescription()">
			<input-field>
				<label for="description"> Enter your description. </label>
				<textarea
					id="description"
					v-model="form.description"
				/>
			</input-field>
			<button class="button">Change Description</button>
		</form>
	</profile-form>
</template>

<style>
	profile-form {
		display: grid;
		gap: 20px;
	}
</style>