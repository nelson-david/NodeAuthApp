const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("Users");
const router = express.Router();

function checkSignIn(req, res, next){
	if (req.cookies.userID){
		Users.findOne({'_id':req.cookies.userID}, (err, user) => {
			if(!err){
				global.current_user = user
				next();
			}else{
				return res.redirect("/login");
			}
		});
	}else{
		return res.redirect("/login");
	}
}

router.get("/login", (req, res) => {
	if (req.cookies.userID){
		return res.redirect("/");
	}
	res.render("pages/login");
});

router.get("/register", (req, res) => {
	if (req.cookies.userID){
		return res.redirect("/");
	}
	res.render("pages/register");
});

router.post("/register", (req, res) => {
	const user = new Users();
	const data = req.body;

	Users.findOne({'name':data.username}, async (err, check) => {
		if (check){
			return res.redirect('/register'); 
		}else{
			user.name = data.username,
			user.email = data.email,
			user.password = await bcrypt.hash(data.password, 12),
			user.date_added = new Date().toISOString();

			user.save((err, doc) => {
				if (!err){
					console.log("Done");
					return res.redirect('/login');
				}else{
					console.log('Error during record insertion : ' + err);
				}
			});
		}
	});

});

router.post("/login", (req, res) => {
	const data = req.body;

	Users.findOne({'name':data.username}, (err, check) => {
		if (check){

			bcrypt.compare(data.password, check.password, (err, result) => {
				if (result){
					res.cookie('userID', check._id, {maxAge: 36000000000000});

					return res.redirect('/');
				}else{
					console.log("Invalid Password");
					return res.redirect('/login'); 
				}
			});
		}else{
			console.log("User Does not exist");
			return res.redirect('/login'); 
		}
	})
});

router.get("/", checkSignIn, (req, res) => {
	res.render("pages/index");
});

router.get("/logout", (req, res) => {
	res.clearCookie('userID');
	return res.redirect('/login');
});

module.exports = router;