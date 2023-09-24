<script>
export default {
	props: {
		content: {
			type: String,
		},
		author: {
			type: String,
		},
		owner: {
			type: Boolean,
		},
		avatar: {
			type: String,
		},
		date: {
			type: String,
		},
	},
	methods: {},
};
</script>

<template>
	<div
		class="message-item d-flex hstack gap-3"
		:class="{ 'my-message': owner }"
	>
		<div class="user-avatar" :style="{ background: avatar }">
			<div class="user-status"></div>
		</div>
		<div class="message d-flex flex-column">
			<span class="message-author">{{ author }}</span>
			<div class="message-body">
				<div class="message-content">
					{{ content }}
				</div>
			</div>
			<span class="message-date">{{ date }}</span>
		</div>
	</div>
</template>

<style scoped>
.message-item {
	position: relative;
	margin-right: 10%;
	word-break: break-word;
}
.user-avatar {
}
.message-item .user-avatar {
	align-self: baseline;
	margin-top: 30px;
}
.message {
	position: relative;
}
.message > * {
	position: relative;
}
.message-body {
	display: flex;
}
.message-content {
	display: inline-block;
	background: #5b5e61;
	color: #f4f5f7;
	padding: 8px 16px;
	border-radius: 14px;
}
.message-author {
	font-size: 14px;
	font-weight: 500;
	color: #777;
	padding: 4px 12px;
}
.message-date {
	font-size: 12px;
	color: #777;
	padding: 4px 12px;
}

.message-item.my-message {
	margin-right: 0;
	margin-left: 10%;
	flex-direction: row-reverse;
	text-align: right;
}
.message-item.my-message .message-content {
	margin-left: auto;
	background: #0d6efd;
}
</style>
