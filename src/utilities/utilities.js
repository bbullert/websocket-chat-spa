export const utilities = {
	getErrors: function (errors) {
		let model = {};
		for (const error of errors) {
			const property =
				error.name.charAt(0).toLowerCase() + error.name.slice(1);
			model[property] = error.messages;
			if (model[property] && model[property].length == 0)
				delete model[property];
		}
		return model;
	},
	clearEmptyProperties: function (obj) {
		for (const property in obj) {
			if (!obj[property]) delete obj[property];
		}
		return obj;
	},
	clamp: function (value, min, max) {
		return Math.max(Math.min(value, max), min);
	},
	inRange: function (value, min, max) {
		return value >= min && value <= max;
	},
	copy: function (model) {
		return JSON.parse(JSON.stringify(model));
	},
	areEqual: function (model1, model2) {
		return JSON.stringify(model1) === JSON.stringify(model2);
	},
};
