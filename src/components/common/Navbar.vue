<script>
import { useAuthStore } from "@/stores/authStore.js";

import Authenticated from "./auth/Authenticated.vue";
import NotAuthenticated from "./auth/NotAuthenticated.vue";

export default {
	methods: {
		goToUserChats() {
			const auth = useAuthStore();
			this.$router.push({
				name: "userChatList",
				params: { userId: auth.getUser.id },
			});
		},
	},
	computed: {
		userName: () => {
			const auth = useAuthStore();
			const user = auth.getUser;
			return user.firstName + " " + user.lastName;
		},
	},
	components: { Authenticated, NotAuthenticated },
};
</script>

<template>
	<nav class="d-flex flex-column navbar navbar-expand-lg">
		<div class="container-fluid">
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav w-100">
					<not-authenticated>
						<router-link
							:to="{ name: 'userCreate' }"
							class="nav-link"
							>Add User</router-link
						>
						<router-link
							:to="{ name: 'chatCreate' }"
							class="nav-link"
							>Add Chat</router-link
						>
						<router-link
							:to="{ name: 'signIn' }"
							class="nav-link ms-auto"
							>Sign In</router-link
						>
					</not-authenticated>
					<authenticated>
						<a
							href=""
							class="nav-link"
							@click.prevent="goToUserChats"
							>Chats</a
						>
						<span class="nav-link ms-auto"
							><b>{{ userName }}</b></span
						>
						<router-link :to="{ name: 'signOut' }" class="nav-link"
							>Sign Out</router-link
						>
					</authenticated>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.navbar {
	background: #fff;
}
</style>
