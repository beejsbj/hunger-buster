<script setup>
import { ref, reactive } from "vue";

defineProps({
		msg: String,
	});

const number = reactive({
	first: 0,
	second: 0,
});

const sum = function () {
	return number.first + number.second;
};
const difference = function () {
	return Math.abs(number.first - number.second);
};
const product = function () {
	return number.first * number.second;
};
const powered = function () {
	return number.first ** number.second;
};
const quotient = function () {
	return number.first / number.second;
};
const modulo = function () {
	return number.first % number.second;
};


</script>

<template>

	<h1>{{ msg }}</h1>

	<form autocomplete="off">
		<div class="input-field">
			<label for="first"> Enter first number </label>
			<input type="number" id="first" v-model="number.first" />
		</div>

		<div class="input-field">
			<label for="second"> Enter second number </label>
			<input type="number" id="second" v-model="number.second" />
		</div>

		<output :class="{ hide: !number.first && !number.second }">
			<p>
				{{ number.first }} + {{ number.second }} = <span>{{ sum() }}</span>
			</p>
			<p>
				{{ number.first }} - {{ number.second }} =
				<span>{{ difference() }}</span>
			</p>
			<p>
				{{ number.first }} * {{ number.second }} = <span>{{ product() }}</span>
			</p>
			<p>
				{{ number.first }} ^ {{ number.second }} = <span>{{ powered() }}</span>
			</p>
			<p>
				{{ number.first }} / {{ number.second }} = <span>{{ quotient() }}</span>
			</p>
			<p>
				{{ number.first }} % {{ number.second }} = <span>{{ modulo() }}</span>
			</p>
		</output>
	</form>
</template>

<style scoped>
.hide {
	opacity: 0;
}
output {
	border: solid 1px hsla(153, 47%, 53%, 1);
	padding: 20px;
	text-align: left;
}
output span {
	color: hsla(153, 47%, 53%, 1);
}
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	padding: 50px;
}

a,
button {
	color: hsla(153, 47%, 53%, 1);
}

button {
	background: none;
	border: solid 1px;
	border-radius: 2em;
	font: inherit;
	padding: 0.75em 2em;
	cursor: pointer;
}
input {
	padding: 10px;
}
form {
	display: grid;
	max-width: 400px;
	gap: 20px;
	margin: 0 auto;
}
.input-field {
	display: grid;
	gap: 10px;
}
</style>
