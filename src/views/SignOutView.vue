<script>
import { useAuthStore } from "@/stores/authStore.js";

export default {
	created() {
		console.log("sign out");
		const auth = useAuthStore();
		auth.signOut();
		this.$router.replace({ name: "adminDashboard" });
	},
};
</script>

<template></template>

<style scoped></style>
