import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import UserCreateView from "@/views/UserCreateView.vue";
import ChatCreateView from "@/views/ChatCreateView.vue";
import SignInView from "@/views/SignInView.vue";
import SignOutView from "@/views/SignOutView.vue";
import UserChatListView from "@/views/UserChatListView.vue";
import ChatView from "@/views/ChatView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/sign-in",
			name: "signIn",
			component: SignInView,
		},
		{
			path: "/sign-out",
			name: "signOut",
			component: SignOutView,
		},
		{
			path: "/users",
			name: "adminDashboard",
			component: AdminView,
		},
		{
			path: "/users/create",
			name: "userCreate",
			component: UserCreateView,
		},
		{
			path: "/chats/create",
			name: "chatCreate",
			component: ChatCreateView,
		},
		{
			path: "/users/:userId/chats",
			name: "userChatList",
			component: UserChatListView,
		},
		{
			path: "/users/:userId/chats/:chatId",
			name: "chat",
			component: ChatView,
		},
	],
});

export default router;
