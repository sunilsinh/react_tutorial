import express from "express";
const router = express.Router();
import auth from "../controllers/AuthController.js";

router.post('/login', function(req, res) {
  auth.login(req, res);
});

router.post('/confirmationToken', function(req, res) {
  auth.confirmationToken(req, res);
});

router.post('/reset_password_request', function(req, res) {
  auth.resetPasswordRequest(req, res);
});

router.post('/validate_token', function(req, res) {
  auth.validateToken(req, res);
});

router.post('/reset_password', function(req, res) {
  auth.resetPassword(req, res);
});


export default router;
