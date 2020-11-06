require("./models/mongodb");

const routes = require("./routes");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


app.use("/", routes);


const PORT = process.env.port || 5000;

app.listen(PORT, () => {
	console.log(`Server Running On PORT ${PORT}`);
});