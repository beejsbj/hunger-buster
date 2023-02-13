import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "@rollup/plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					//every tag with '-' is a custom element
					isCustomElement: (tag) => tag.includes("-"),
				},
			},
		}),
		{
			...eslint({
				include: "src/**/*.*/js",
			}),
			enforce: "pre",
			apply: "build",
		},
		AutoImport({
			/* options */
			imports: [
				"vue",
				"pinia",
				{
					vuefire: ["useCollection", "useDocument", "useFirestore"],
					"vue-router": [
						"RouterView",
						"RouterLink",
						"useRoute",
						"useRouter",
					],
					"firebase/firestore": ["collection", "addDoc", "setDoc", "doc"],
				},
				{
					"@/stores/shop": ["useShopStore"],
					"@/stores/user": ["useUserStore"],
				},
			],
			dirs: ["src/stores"],
			dts: true,
		}),
		Components({
			dirs: ["src/views", "src/components", "src/views/pages"],
			dts: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
