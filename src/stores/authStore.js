import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
	}),
	getters: {
		getUser: (state) => {
			if (!state.user) {
				state.user = JSON.parse(window.sessionStorage.getItem("user"));
			}
			return state.user;
		},
		isAuthenticated() {
			return this.getUser != null;
		},
	},
	actions: {
		signIn(user) {
			window.sessionStorage.setItem("user", JSON.stringify(user));
			this.user = user;
		},
		signOut() {
			window.sessionStorage.removeItem("user");
			this.user = null;
		},
	},
});
