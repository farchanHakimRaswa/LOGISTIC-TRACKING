const include = require('../include');
const CustomerController = require('../controller/Customer/CustomerController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// ADD DATA CUSTOMER
router.post('/', auth.verifyToken, CustomerController.addData);

// GET ALL DATA CUSTOMER
router.get('/', auth.verifyToken, CustomerController.getAllData);

// GET  DATA CUSTOMER BY ID
router.get('/:_id', auth.verifyToken, CustomerController.getDataById);

// REPLACE DATA CUSTOMER BY ID
router.put('/:_id', auth.verifyToken, CustomerController.updateData);

// DELETE DATA BY CUSTOMER ID
router.delete('/:_id', auth.verifyToken, CustomerController.delateData);

module.exports = router;