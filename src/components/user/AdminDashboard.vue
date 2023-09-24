<script>
import { utilities } from "@/utilities/utilities.js";
import { userService } from "@/services/userService.js";
import { chatService } from "@/services/chatService.js";
import { chatUserService } from "@/services/chatUserService.js";
import UserItem from "../common/UserItem.vue";
import DraggableItem from "../common/DraggableItem.vue";

export default {
	data() {
		return {
			users: {},
			chats: {},
		};
	},
	methods: {
		async getAllUsers() {
			await userService.getAll().then((response) => {
				// console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					this.users = response.result;
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		async getAllChats() {
			await chatService.getAll().then((response) => {
				// console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					this.chats = response.result;
					this.getChatUsers();
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		async getChatUsers() {
			for (const chat of this.chats) {
				await chatUserService.getChatUsers(chat.id).then((response) => {
					// console.log(response);
					if (utilities.inRange(response.status, 200, 299)) {
						chat.users = response.result;
					} else if (utilities.inRange(response.status, 400, 499)) {
						this.$root.$refs.errorModal.raise(response.details);
					} else if (utilities.inRange(response.status, 500, 599)) {
						this.$root.$refs.errorModal.raise(response.details);
					}
				});
			}
		},
		async addUserToChat(userId, chatId) {
			await chatUserService.create(chatId, userId).then((response) => {
				console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					const chat = this.chats.find((x) => x.id == chatId);
					const user = this.users.find((x) => x.id == userId);
					chat.users.push(user);
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		async removeUserFromChat(chatId, userId) {
			console.log(userId, chatId);
			await chatUserService.remove(chatId, userId).then((response) => {
				console.log(response);
				if (utilities.inRange(response.status, 200, 299)) {
					const chat = this.chats.find((x) => x.id == chatId);
					const user = chat.users.find((x) => x.id == userId);
					chat.users = chat.users.filter((x) => x != user);
				} else if (utilities.inRange(response.status, 400, 499)) {
					this.$root.$refs.errorModal.raise(response.details);
				} else if (utilities.inRange(response.status, 500, 599)) {
					this.$root.$refs.errorModal.raise(response.details);
				}
			});
		},
		onItemDrop($event, item) {
			const target = $event.target;
			console.log(target, item);
			if (!target.classList.contains("user-drop")) return;
			const chatId = target.children["chatId"].value;

			if (!item.classList.contains("user-item")) return;
			const userId = item.children["userId"].value;

			console.log(chatId, userId);
			this.addUserToChat(userId, chatId);
		},
	},
	mounted() {
		this.getAllUsers();
		this.getAllChats();
	},
	components: { UserItem, DraggableItem },
};
</script>

<template>
	<section class="d-flex flex-grow-1 overflow-x-scroll position-relative">
		<div class="chats d-flex align-items-start">
			<div class="card" v-for="chat in chats">
				<h6>{{ chat.name }}</h6>
				<div class="user-drop">
					Drop here
					<input type="hidden" name="chatId" :value="chat.id" />
				</div>
				<div v-if="chat.users?.length" class="users d-flex flex-column">
					<div v-for="user in chat.users" class="hstack">
						<UserItem :user="user"></UserItem>
						<button
							type="button"
							class="btn remove-item ms-auto"
							@click="removeUserFromChat(chat.id, user.id)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
							>
								<path
									d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="sidenav d-flex flex-column overflow-y-auto">
		<DraggableItem v-for="user in users" @drop="onItemDrop">
			<UserItem :user="user"></UserItem>
		</DraggableItem>
	</section>
</template>

<style scoped>
.chats {
	/* background: #f4f5f7; */
	position: absolute;
	padding: 36px;
	/* margin: 36px; */
	/* flex: 0 0 100%; */
	gap: 24px;
}
.card {
	/* width: 368px; */
	width: 320px;
	min-height: 120px;
	padding: 0px;
	margin: 0px;
	color: rgba(0, 0, 0, 0.7);
	border: none;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.card h6 {
	font-size: 18px;
	margin: 24px 24px 12px 24px;
}
.card .users {
	padding-bottom: 12px;
}
.users {
}
.user-drop {
	font-weight: 600;
	padding: 12px;
	margin: 12px 24px 24px 24px;
	color: #b8c1cf;
	border: dashed 3px #d5dae2;
	text-align: center;
	border-radius: 10px;
	cursor: default;
	user-select: none;
}
.user-drop:hover {
	background: #dcedff;
	color: #85bbf1;
	border-color: #a8cffc;
}
.remove-item {
	width: 36px;
	height: 36px;
	margin-right: 24px;
	border-radius: 50%;
	border: none;
}
.remove-item svg {
	width: 20px;
	height: 20px;
	fill: rgb(170, 171, 175);
	margin-top: -4px;
	margin-left: -4px;
}
.remove-item:hover {
	background: #f3f3f3;
}

.draggable-item .user-item:hover {
	background: #f3f3f3;
}

.sidenav {
	background: #fff;
	min-width: 300px;
	padding: 24px 8px;
}
</style>
