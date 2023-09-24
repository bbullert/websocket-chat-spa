<script>
import { useAuthStore } from "@/stores/authStore.js";

export default {
	props: {
		redirect: {
			type: String,
			default: null,
		},
	},
	methods: {
		isAuthenticated() {
			const auth = useAuthStore();
			return auth.isAuthenticated;
		},
	},
	mounted() {
		if (!this.isAuthenticated()) return;

		if (this.redirect == "")
			this.$router.replace({ name: "adminDashboard" });

		if (this.redirect) this.$router.replace(this.redirect);
	},
};
</script>

<template>
	<slot v-if="!isAuthenticated()"></slot>
</template>

<style scoped></style>
