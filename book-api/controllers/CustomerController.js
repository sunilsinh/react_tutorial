import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Customer from "../models/Customer";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";

var customerController = {};
customerController.list = function(req, res) {
  Customer.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log("Success:", 'success000');
    }
  });
};

customerController.register = function(req, res) {
const customer = new Customer(req.body.user);
customer.setPassword(req.body.user.password);
customer.setConfirmationToken();
customer.save().
		then(userRecord => {
			//sendConfirmationEmail(userRecord);
			res.json({user: userRecord.toAuthJSON()});
		})
	.catch(err => res.status(400).json({error : parseErrors(err.errors) } ));
};


customerController.userDetail = function(req, res) {	
Customer.findOne({ _id: req.currentUser._id }).then(user => {
//Customer.findOne({ email: req.body.email }).then(user => {
    let UserArray = [];
	if (user) {
		
		/*UserArray['firstname'] = user.fname;
		UserArray['lastname'] = user.lname;
		UserArray['email'] = user.email;
		UserArray['phone'] = user.phone;
		
		console.log(UserArray);*/
      res.json({user:user});
    } else {
      res.status(400) .json({ errors: { global: "NO USER FOUND." } });
    }
  });
};

customerController.userUpdate = function(req, res) {
const customer = new Customer(req.body.user);

	Customer.findOne({ email: req.body.user }).then(user => {
		
		
		if(user){
			customer.save();
		}
		else {
			res.status(400) .json({ errors: { global: "Something went wrong" } });
		}
   
	
	})
	.catch(err => res.status(400).json({error : parseErrors(err.errors) } ));
};

export default customerController;