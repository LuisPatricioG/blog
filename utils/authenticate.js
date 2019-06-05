const authorModel = require('../models/Authors');
const bcrypt = require('bcrypt');

// user = {email:"email@email.com",password:"kjahdjahs",....}
const authenticate =  ({username,password}) => {
	return  new Promise((resolve,reject) => {
		authorModel.findOne({username}).then((author) =>{
			if(!author)reject(new Error("User does not exist"));
			bcrypt.compare(password,author.password,(err,isValid) =>{
					if(!isValid) reject(new Error("Password not match"))
					resolve(author)
			})
		}).catch((err) => {
			reject(err)
		})

	});
};

module.exports =  {authenticate}; 