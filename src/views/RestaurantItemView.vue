<script setup>
	import { reactive } from "vue";
	import { useRoute } from "vue-router";
	import { useShopStore } from "../stores/shop.js";

	const route = useRoute();
	const shop = useShopStore();

	const restaurant = shop.list.restaurants.find(function (restaurant) {
		return (
			route.params.slug == restaurant.id ||
			route.params.slug == restaurant.slug
		);
	});
	const foundItem = restaurant.menuItems.find(function (item) {
		return (
			route.params.itemSlug == item.id || route.params.itemSlug == item.slug
		);
	});
	const item = reactive(foundItem);
</script>
		<required-options v-if="item.requiredOptions">
			<h2 class="attention-voice">Required Options</h2>
			<ul
				class="radio-list"
				v-for="(options, key) in item.requiredOptions"
			>
				<h3 class="solid-voice">
					Please Select {{ key }}
					<span>required</span>
					{{ selected }}
				</h3>
				<li
					class="radio-item"
					v-for="option in options"
				>
					<label :for="option.name">
						{{ option.name ?? option }}
					</label>
					<input
						required
						:v-model="selected"
						:name="key"
						type="radio"
						:value="option.name"
					/>
				</li>
			</ul>
		</required-options>

		<extra-options v-if="item.extraOptions">
			<h2 class="attention-voice">Extra Options</h2>
			<ul
				class="radio-list"
				v-for="(options, key) in item.extraOptions"
			>
				<h3 class="solid-voice">Please Select {{ key }}</h3>
				<li
					class="radio-item"
					v-for="option in options"
				>
					<label :for="option.name">{{ option.name }}</label>
					<input
						:v-model="selected"
						:name="key"
						type="checkbox"
						:value="option.name"
					/>
				</li>
			</ul>
		</extra-options>
