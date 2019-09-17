import express from "express";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer";
import { sendResetPasswordEmail } from "../mailer";
var authController = {};
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

authController.login = function(req, res) {
  const { credentials } = req.body;
  Customer.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
};



authController.confirmationToken = function(req, res) {
  const token = req.body.token;
  Customer.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(
    user =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({ errors: { global: "Invalid Token" } })
  );
};

authController.resetPasswordRequest = function(req, res) {
  Customer.findOne({ email: req.body.email }).then(user => {
    if (user) {
	  sendResetPasswordEmail(user);
      res.json({});
    } else {
      res
        .status(400)
        .json({ errors: { global: "There is no user with such email" } });
    }
  });
};

authController.validateToken = function(req, res) {
  let tokenSeckret = "worldisfullofdevelopers";
  jwt.verify(req.body.token, tokenSeckret, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
};


authController.resetPassword = function(req, res) {

let tokenSeckret = "worldisfullofdevelopers"

  jwt.verify(req.body.data.token, tokenSeckret, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      Customer.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(req.body.data.password);
          user.save().then(() => res.json({success : "Password has been reset successfully."}));
        } else {
          res.status(404).json({ errors: { global: "Invalid token" } });
        }
      });
    }
  })
 
};


export default authController;