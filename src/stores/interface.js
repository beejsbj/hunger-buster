import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", function () {
	const mainMenuOpen = ref(false);

	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	return {
		mainMenuOpen,
		toggleMenu,
	};
});
