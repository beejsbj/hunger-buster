import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', function(){
	
	const mainMenuOpen = ref(true);

	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	return {
		mainMenuOpen,
		toggleMenu
	}
})