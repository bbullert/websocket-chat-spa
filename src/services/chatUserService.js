const API = "https://localhost:5001/api/";

export const chatUserService = {
	get: function (chatId, userId) {
		return fetch(API + "chats/" + chatId + "/users/" + userId)
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	getChatUsers: function (chatId) {
		return fetch(API + "chats/" + chatId + "/users")
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	getUserChats: function (userId) {
		return fetch(API + "users/" + userId + "/chats")
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	create: function (chatId, userId) {
		return fetch(API + "chats/" + chatId + "/users/" + userId, {
			method: "POST",
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	remove: function (chatId, userId) {
		return fetch(API + "chats/" + chatId + "/users/" + userId, {
			method: "DELETE",
		})
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
};
