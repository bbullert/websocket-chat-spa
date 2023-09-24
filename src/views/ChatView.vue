<script>
import { utilities } from "@/utilities/utilities.js";
import { chatUserService } from "@/services/chatUserService.js";
import { messageService } from "@/services/messageService.js";
import { chatMessageService } from "@/services/chatMessageService.js";
import { useAuthStore } from "@/stores/authStore.js";

import Authenticated from "@/components/common/auth/Authenticated.vue";
import UserItem from "@/components/common/UserItem.vue";
import Message from "../components/chat/Message.vue";

export default {
	data() {
		return {
			users: [],
			messages: [],
			message: null,
		};
	},
	methods: {
		getUserChats() {
			const chatId = this.$route.params.chatId;
			chatUserService.getChatUsers(chatId).then((response) => {
				if (utilities.inRange(response.status, 200, 299)) {
					this.users = response.result;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		getChatMessages() {
			const chatId = this.$route.params.chatId;
			chatMessageService.getChatMessages(chatId).then((response) => {
				if (utilities.inRange(response.status, 200, 299)) {
					this.messages = response.result;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		send() {
			const auth = useAuthStore();
			const model = {
				content: this.message,
				createDate: new Date(),
				userId: auth.getUser.id,
				chatId: this.$route.params.chatId,
			};

			messageService.create(model).then((response) => {
				if (utilities.inRange(response.status, 200, 299)) {
					this.message = null;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		isAuthenticatedUserAuthor(message) {
			const auth = useAuthStore();
			return auth.getUser.id == message.userId;
		},
	},
	mounted() {
		this.getUserChats();
		this.getChatMessages();
	},
	components: {
		Authenticated,
		UserItem,
		Message,
	},
};
</script>

<template>
	<section class="d-flex flex-grow-1 overflow-y-hidden position-relative">
		<authenticated redirect>
			<section class="chat d-flex flex-column flex-grow-1">
				<div
					class="message-container d-flex flex-grow-1 overflow-y-auto"
				>
					<div class="messages d-flex p-3">
						<message
							v-for="message in messages"
							:content="message.content"
							:author="message.userFullName"
							:owner="isAuthenticatedUserAuthor(message)"
							:avatar="message.userAvatar"
							:date="message.createDateString"
						></message>
					</div>
				</div>
				<div class="message-bar hstack gap-3 p-3">
					<input
						type="text"
						class="form-control"
						id="message"
						v-model="message"
					/>
					<button
						type="submit"
						class="btn btn-primary"
						:disabled="!message"
						style="width: 120px"
						@click="send"
					>
						Send
					</button>
				</div>
			</section>
			<section class="sidenav d-flex flex-column overflow-y-auto">
				<UserItem v-for="user in users" :user="user"></UserItem>
			</section>
		</authenticated>
	</section>
</template>

<style scoped>
.chat {
	/* display: flex;
	flex-wrap: wrap;
	max-width: 100%;
	flex-direction: column; */
	/* width: 500px; */
	/* width: 60%; */
}
.message-container {
	position: relative;
	height: 100%;
	flex-direction: column-reverse;
	/* display: inline-block; */
	/* word-break: break-word; */
	/* text-wrap: wrap; */
}
.messages {
	/* height: 100%; */
	flex-direction: column;
}
.message-bar {
	background: #fff;
}

.sidenav {
	background: #fff;
	min-width: 300px;
	width: 300px;
	padding: 24px 8px;
}
.sidenav span {
	padding: 8px 24px;
	cursor: pointer;
}
</style>
