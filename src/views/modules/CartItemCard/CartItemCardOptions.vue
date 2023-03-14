<script setup>
	//////////////////////////////////////////

	const props = defineProps(["options"]);

	function optionSelected(option) {
		return option.choices.some(function (choice) {
			return choice.selected;
		});
	}
</script>
<template>
	<TransitionGroup
		name="list"
		tag="ul"
		class="options"
		v-if="options"
	>
		<template v-for="option in options">
			<li
				:key="option.name"
				v-if="optionSelected(option)"
			>
				<p class="whisper-voice">
					{{ option.name }}
				</p>
				<ul class="choices">
					<template v-for="choice in option.choices">
						<li
							:key="choice.name"
							v-if="choice.selected"
							class="small-voice"
						>
							- {{ choice.name }}
							<span
								class="price"
								v-if="choice.price"
								>{{ choice.price }}</span
							>
						</li>
					</template>
				</ul>
			</li>
		</template>
	</TransitionGroup>
</template>

<style scoped>
	span.price {
		--highlight: green;
		color: var(--highlight);
	}

	ul.options {
		display: grid;
		gap: 10px;
	}
	ul.choices {
		display: grid;
		gap: 5px;
	}
</style>
