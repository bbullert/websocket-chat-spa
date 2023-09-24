<script>
import { utilities } from "@/utilities/utilities.js";
import { chatService } from "@/services/chatService.js";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";

export default {
	data() {
		return {
			model: {
				name: null,
			},
			defaultModel: {},
			errors: {},
		};
	},
	methods: {
		get() {
			return utilities.copy(this.model);
		},
		create() {
			chatService.create(this.model).then((response) => {
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
				<h4 class="pb-3">Create Chat</h4>
				<div class="col-6">
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': errors.name }"
							id="name"
							v-model="model.name"
						/>
						<label for="name" class="text-dark">Name</label>
						<div :class="{ 'invalid-feedback': errors.name }">
							{{ errors.name && errors.name[0] }}
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
