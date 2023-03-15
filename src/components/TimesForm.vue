<script setup>
	const props = defineProps(["restaurantForm"]);
	if (!props.restaurantForm.times) {
		props.restaurantForm.times = {
			Monday: {
				open: "",
				close: "",
			},
			Tuesday: {
				open: "",
				close: "",
			},
			Wednesday: {
				open: "",
				close: "",
			},
			Thursday: {
				open: "",
				close: "",
			},
			Friday: {
				open: "",
				close: "",
			},
			Saturday: {
				open: "",
				close: "",
			},
			Sunday: {
				open: "",
				close: "",
			},
		};
	}
</script>
<template>
	<times-form>
		<day-field
			v-for="(dayObj, day) in restaurantForm.times"
			:key="day"
		>
			<h2 class="firm-voice">{{ day }}</h2>

			<input-field class="radio">
				<label :for="`${day}Closed`">Closed?</label>
				<input
					type="checkbox"
					:id="`${day}Closed`"
					v-model="dayObj.closed"
			/></input-field>
			<template v-if="!dayObj.closed">
				<input-field>
					<label :for="`${day}Opening`">Opening</label>
					<input
						type="time"
						:id="`${day}Opening`"
						v-model="dayObj.opening"
					/>
				</input-field>
				<input-field v-if="dayObj.opening">
					<label :for="`${day}Closing`">Closing</label>

					<input
						type="time"
						:id="`${day}Closing`"
						v-model="dayObj.closing"
				/></input-field>
			</template>
		</day-field>
	</times-form>
</template>

<style scoped>
	times-form {
		display: grid;
		gap: 30px;
		/* justify-content: start; */
		padding: 20px 0;
	}

	times-form day-field {
		/* border: 4px solid red; */
		display: grid;
		gap: 20px;
		grid-template-columns: 0.3fr 0.3fr 1fr 1fr;
		align-items: center;
	}
	input-field.radio {
		display: flex;
	}

	times-form input-field {
		padding: 0;
	}
</style>
