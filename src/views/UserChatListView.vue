<script>
import { utilities } from "@/utilities/utilities.js";
import { chatUserService } from "@/services/chatUserService.js";
import { useAuthStore } from "@/stores/authStore.js";
import Authenticated from "@/components/common/auth/Authenticated.vue";

export default {
	data() {
		return {
			chats: [],
		};
	},
	methods: {
		getUserChats() {
			const userId = this.$route.params.userId;
			chatUserService.getUserChats(userId).then((response) => {
				if (utilities.inRange(response.status, 200, 299)) {
					this.chats = response.result;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		selectChat(chatId) {
			const auth = useAuthStore();
			this.$router.push({
				name: "chat",
				params: { chatId: chatId, userId: auth.getUser.id },
			});
		},
		isSelected(chatId) {
			return chatId == this.$route.params.chatId;
		},
	},
	mounted() {
		this.getUserChats();
	},
	components: {
		Authenticated,
	},
};
</script>

<template>
	<section class="d-flex flex-grow-1 overflow-y-hidden">
		<authenticated redirect>
			<section class="d-flex flex-column flex-grow-1"></section>
			<section class="sidenav d-flex flex-column overflow-y-auto">
				<span
					v-for="chat in chats"
					:class="isSelected(chat.id)"
					@click="selectChat(chat.id)"
					>{{ chat.name }}</span
				>
			</section>
		</authenticated>
	</section>
</template>

<style scoped>
.sidenav {
	background: #fff;
	min-width: 300px;
	padding: 24px 8px;
}
.sidenav span {
	padding: 8px 24px;
	cursor: pointer;
}
.sidenav span.selected {
	background: red;
}
</style>
