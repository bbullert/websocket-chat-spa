<script>
export default {
	props: {
		user: {
			type: Object,
			default: {
				avatar: null,
				firstName: null,
				lastName: null,
			},
		},
	},
	emits: ["ok"],
	data() {
		return {};
	},
	methods: {
		raise(content = "") {
			this.content = content;
			this.$refs.modalRef.show();
		},
		ok($event) {
			this.$refs.modalRef.hide();
			this.$emit("ok", $event);
		},
	},
	mounted() {},
};
</script>

<template>
	<div class="user-item hover hstack gap-3">
		<input type="hidden" name="userId" :value="user.id" />
		<div class="user-avatar" :style="{ background: user.avatar }">
			<div class="user-status"></div>
		</div>
		<span class="user-details"
			>{{ user.firstName }} {{ user.lastName }}</span
		>
	</div>
</template>

<style>
.user-item {
	background: #fff;
	width: 268px;
	border-radius: 14px;
	padding: 12px 24px;
	color: rgba(0, 0, 0, 0.7);
}
.user-avatar {
	position: relative;
	background: #c2c8d1;
	width: 28px;
	min-width: 28px;
	height: 28px;
	border-radius: 50%;
}

.user-status {
	position: absolute;
	background: #54ff5c;
	width: 14px;
	height: 14px;
	bottom: 0;
	right: 0;
	margin: -4px;
	border-radius: 50%;
	border: 3px solid #fff;
}
.user-details {
	font-weight: 600;
}
</style>
