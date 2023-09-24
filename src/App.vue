<script setup>
import { RouterLink, RouterView } from "vue-router";
import ErrorModal from "./components/common/modals/ErrorModal.vue";
import Navbar from "./components/common/Navbar.vue";
</script>

<template>
	<main class="d-flex flex-column vh-100">
		<Navbar></Navbar>
		<RouterView />
		<ErrorModal ref="errorModal" title="Error"></ErrorModal>
	</main>
</template>

<style scoped></style>
