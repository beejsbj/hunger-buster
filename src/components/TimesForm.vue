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

<style lang="scss" scoped>
	times-form {
		display: grid;
		gap: 20px;
		padding: 20px 0;
	}

	times-form day-field {
		display: grid;
		gap: 20px;
		align-items: center;

		@media (min-width: 450px) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: 850px) {
			grid-template-columns: 0.3fr 0.3fr 1fr 1fr;
		}
	}

	day-field + day-field {
		border-top: 1px solid var(--highlight);
		padding-top: 20px;
	}
	input-field.radio {
		display: flex;
	}

	times-form input-field {
		padding: 0;
	}
</style>
