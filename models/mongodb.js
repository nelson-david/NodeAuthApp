const mongoose = require("mongoose");
const { MONGODB } = require("../config.js");

mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology: true})
	console.log("Database connected successfully");

require('./users.model');
// require('./notes.model');