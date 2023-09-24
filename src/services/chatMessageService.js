const API = "https://localhost:5001/api/";

export const chatMessageService = {
	getChatMessages: function (chatId) {
		return fetch(API + "chats/" + chatId + "/messages")
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
};
