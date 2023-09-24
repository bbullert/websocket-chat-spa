const API = "https://localhost:5001/api/";

export const messageService = {
	get: function (id) {
		return fetch(API + "messages/" + id)
			.then((response) => response.text())
			.then((data) => {
				return Promise.resolve(data ? JSON.parse(data) : {});
			})
			.catch((failure) => {
				return Promise.reject(failure);
			});
	},
	create: function (model) {
		return fetch(API + "messages", {
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
