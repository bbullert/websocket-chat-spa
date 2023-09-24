<script>
import { utilities } from "@/utilities/utilities.js";
import { userService } from "@/services/userService.js";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";

export default {
	data() {
		return {
			model: {
				firstName: null,
				lastName: null,
				birthDate: null,
			},
			defaultModel: {},
			errors: {},
		};
	},
	methods: {
		set(args) {
			this.model.firstName = args.firstName;
			this.model.lastName = args.lastName;
			this.model.birthDate = args.birthDate;
		},
		get() {
			return utilities.copy(this.model);
		},
		create() {
			this.model.avatar =
				"hsl(" + Math.floor(Math.random() * 361) + ", 100%, 70%)";
			userService.create(this.model).then((response) => {
				console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					this.model = utilities.copy(this.defaultModel);
					this.$router.push("/users");
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.errors = utilities.getErrors(response.result.errors);
				} else if (utilities.inRange(response.status, 500, 599)) {
				}
			});
		},
		cancel() {
			if (this.hasChanged()) {
				this.$refs.discardChangesModal.raise();
				return;
			}
			this.back();
		},
		back() {
			this.$router.back();
		},
		hasChanged() {
			return !utilities.areEqual(this.model, this.defaultModel);
		},
	},
	mounted() {
		this.defaultModel = utilities.copy(this.model);
	},
	components: {
		ConfirmModal,
	},
};
</script>

<template>
	<div
		class="container vh-100 d-flex flex-column justify-content-center"
		style="max-width: 900px"
	>
		<form @submit.prevent="create" class="card p-3">
			<div class="row p-3">
				<h4 class="pb-3">Create User</h4>
				<div class="col-6">
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': errors.firstName }"
							id="firstName"
							v-model="model.firstName"
						/>
						<label for="firstName" class="text-dark"
							>First Name</label
						>
						<div :class="{ 'invalid-feedback': errors.firstName }">
							{{ errors.firstName && errors.firstName[0] }}
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': errors.lastName }"
							id="lastName"
							v-model="model.lastName"
						/>
						<label for="lastName" class="text-dark"
							>Last Name</label
						>
						<div :class="{ 'invalid-feedback': errors.lastName }">
							{{ errors.lastName && errors.lastName[0] }}
						</div>
					</div>
				</div>
			</div>
			<div class="hstack gap-3 m-3">
				<button
					type="button"
					class="btn ms-auto"
					:class="hasChanged() ? 'btn-danger' : ' btn-secondary'"
					@click="cancel"
					style="width: 120px"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="!hasChanged()"
					style="width: 120px"
				>
					Create
				</button>
			</div>
		</form>
	</div>

	<ConfirmModal
		ref="discardChangesModal"
		title="Discard changes"
		@confirm="back"
	>
		<p>Are you sure you want to discard changes?</p>
	</ConfirmModal>
</template>

<style scoped></style>
