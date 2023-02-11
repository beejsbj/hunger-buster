
<script setup>
	import { ref } from "vue";

	const props = defineProps(["options"]);
	const options = props.options;

	var selections = ref({});
	const multiSelections = ref([]);
	var allSelections;
	function addSelections() {
		allSelections = Object.values(selections.value);
		allSelections.push(...multiSelections.value);
	}
</script>

<template>
	<ul class="options">
		<li :key="option.name" class="options-card" v-for="option in options">
			<text-content>
				<h2 class="solid-voice">
					{{ option.name }}
				</h2>
				<p class="required" v-if="option.required">required</p>
			</text-content>
			<ul class="choices">
				<li
					:key="choice.name"
					class="choice"
					v-for="choice in option.choices"
				>
					<label for="">
						<span>{{ choice.name }}</span>
						<span class="price" v-if="choice.priceIncrease"
							>${{ choice.priceIncrease }}</span
						>
					</label>
					<input
						v-if="option.required"
						:name="option.name"
						type="radio"
						:value="
							true
								? {
										option: option.name,
										choice: choice.name,
										price: choice.priceIncrease,
								  }
								: ''
						"
						v-model="selections[option.name]"
						required
					/>
					<input
						v-if="!option.required"
						type="checkbox"
						:value="
							true
								? {
										option: option.name,
										choice: choice.name,
										price: choice.priceIncrease,
								  }
								: ''
						"
						v-model="multiSelections"
					/>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	label {
		display: grid;
		.price {
			color: green;
		}
	}
	.options > *:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.options-card {
		padding: 10px;
	}
	.choices {
		display: grid;
		gap: 10px;
	}
	.choice {
		display: flex;
		justify-content: space-between;
		input {
			width: 20px;
		}
	}

	text-content {
		display: flex;
		justify-content: space-between;
	}
	.required {
		color: red;
		font-size: 14px;
		vertical-align: super;
	}
</style>