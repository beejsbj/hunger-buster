<script setup>
	const ui = useInterfaceStore();

	const form = reactive({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	function sendEmail() {
		// send firebase email
		ui.loader();

		// reset form
		form.name = "";
		form.email = "";
		form.subject = "";
		form.message = "";
	}
</script>

<template>
	<article>
		<h1 class="loud-voice">Feedback</h1>
		<p>
			Please contact us if you have any questions or concerns. You can also
			contact us by phone at
			<a href="tel:1234567890">123-456-7890</a>
		</p>
		<!-- create an email contact Form -->
		<form
			@submit.prevent="sendEmail"
			enctype="text/plain"
		>
			<input-field>
				<label for="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					v-model="form.name"
					placeholder="Your name.."
				/>
			</input-field>
			<input-field>
				<label for="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					v-model="form.email"
					placeholder="Your email.."
				/>
			</input-field>
			<input-field>
				<label for="subject">Subject:</label>
				<input
					type="text"
					id="subject"
					name="subject"
					v-model="form.subject"
					placeholder="Subject.."
				/>
			</input-field>
			<input-field>
				<label for="message">Message:</label>
				<textarea
					id="message"
					name="message"
					v-model="form.message"
					placeholder="Write something.."
					style="height: 200px"
				></textarea>
			</input-field>
			<input
				type="submit"
				value="Submit"
			/>
		</form>
	</article>
</template>
