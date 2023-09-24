<script setup>
import AdminDashboard from "@/components/user/AdminDashboard.vue";
import NotAuthenticated from "@/components/common/auth/NotAuthenticated.vue";
</script>

<template>
	<section class="d-flex flex-grow-1 overflow-y-hidden">
		<not-authenticated>
			<AdminDashboard></AdminDashboard>
		</not-authenticated>
	</section>
</template>

<style></style>
