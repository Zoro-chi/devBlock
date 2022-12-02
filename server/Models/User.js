const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		gitHubId: {
			type: String,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		coverPicture: {
			type: String,
			default: "",
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: ["632b0b187c118122c34240ea", "6329c1b967ca3cba820d8d65"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		desc: {
			type: String,
			max: 50,
		},
		city: {
			type: String,
			max: 50,
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
