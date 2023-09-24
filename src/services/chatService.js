const API = "https://localhost:5001/api/";

export const chatService = {
	get: function (id) {
		return fetch(API + "chats/" + id)
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	getAll: function () {
		return fetch(API + "chats")
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	create: function (model) {
		return fetch(API + "chats", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(model),
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
