import express from "express";
const router = express.Router();
import customer from "../controllers/CustomerController.js";
import authenticate from "../middlewares/authenticate";
router.use(authenticate);
router.get('/', function(req, res) {
  customer.list(req, res);
});


router.post('/', function(req, res) {
  customer.register(req, res);
});

router.get('/userDetail', function(req, res) {
  customer.userDetail(req, res);
});

router.post('/update', function(req, res) {
  customer.userUpdate(req, res);
});

// Get all employees



/*
router.get('/show/:id', function(req, res) {
  customer.show(req, res);
});

router.get('/create', function(req, res) {
  customer.create(req, res);
});

router.post('/save', function(req, res) {
  
  customer.save(req, res);
    
});

router.get('/edit/:id', function(req, res) {
  customer.edit(req, res);
});

router.post('/update/:id', function(req, res) {
  customer.update(req, res);
});

// Edit update
router.get('/delete/:id', function(req, res, next) {
  customer.delete(req, res);
});
*/
export default router;
