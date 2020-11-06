const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	name: {type:String, required: "This field is required"},
	email: {type:String, required: "This field is required"},
	password: {type:String, required: "This field is required"},
	date_added: {type:Date, required: "This field is not ReEE"}
});

module.exports = mongoose.model("Users", usersSchema);