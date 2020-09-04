const include = require('../include');
const packageController = require('../controller/Package/PackageController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// ADD DATA PACKAGE
router.post('/', auth.verifyToken, packageController.addData);

// GET ALL DATA PACKAGE
router.get('/', auth.verifyToken, packageController.getAllData);

// GET  DATA PACKAGE BY ID
router.get('/:transaction_id', auth.verifyToken, packageController.getDataById);

// REPLACE DATA PACKAGE BY ID
router.put('/:transaction_id', auth.verifyToken, packageController.putData);

// UPDATE KOLI DATA BY ID
router.patch('/:transaction_id', auth.verifyToken, packageController.patchDataKoli);

// DELETE DATA BY PACKAGE ID
router.delete('/:transaction_id', auth.verifyToken, packageController.delateData);

module.exports = router;