<script>
import { utilities } from "@/utilities/utilities.js";
import { userService } from "@/services/userService.js";
import { useAuthStore } from "../stores/authStore";

export default {
	data() {
		return {
			model: {
				users: [],
				selected: null,
			},
			errors: {},
		};
	},
	methods: {
		getAll() {
			userService.getAll().then((response) => {
				console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					this.model.users = response.result;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		signIn() {
			userService.get(this.model.selected).then((response) => {
				console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					const auth = useAuthStore();
					auth.signIn(response.result);
					this.$router.push({
						name: "userChatList",
						params: { userId: this.model.selected },
					});
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		back() {
			this.$router.back();
		},
	},
	mounted() {
		this.getAll();
	},
};
</script>

<template>
	<div
		class="container vh-100 d-flex flex-column justify-content-center"
		style="max-width: 900px"
	>
		<form @submit.prevent="signIn" class="card p-3">
			<div class="row p-3">
				<h4 class="pb-3">Sign In</h4>
				<div class="col-6">
					<select class="form-select" v-model="model.selected">
						<option v-for="user in model.users" :value="user.id">
							{{ user.firstName }} {{ user.lastName }}
						</option>
					</select>
				</div>
			</div>
			<div class="hstack gap-3 m-3">
				<button
					type="button"
					class="btn ms-auto btn-secondary"
					@click="back"
					style="width: 120px"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="false"
					style="width: 120px"
				>
					Sign In
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped></style>
