var express = require('express');
const auth = require('../models/user');
var router = express.Router();
const jwt = require("jsonwebtoken");
const sendEmail = require('../models/send-email');

router.get('/', function(req, res, next) {
    auth.find(function(err, data) {
       res.render('signup.twig',{data})
    });
});


    // Token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
    router.post('/', async function(req, res)  {
        try{
        var newUser = new auth({
            name:req.body.name,
            email: req.body.email,
            password: req.body.pw,
    
        });
        newUser.save();
        sendEmail(newUser.email, 'Registration', 'Welcome '+ newUser.name+' your registration have been succeded');
        console.log(newUser)
        
        const token = jwt.sign(
			{
				id: newUser._id,
				username: newUser.name
			},
			'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
		)
        res.redirect("/home/"); 
    } 
        
        catch{ 
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      	res.json({ user: 'error validation' })
          //res.status(201).json({ user: newUser._id , token: token});
        }
         
      });
module.exports = router;