const include = require('../include');
const KoliController = require('../controller/Koli/KoliController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// ADD DATA LOCATION
router.post('/', auth.verifyToken, KoliController.addData);

// GET ALL DATA KOLI
router.get('/', auth.verifyToken, KoliController.getAllData);

// GET  DATA KOLI BY ID
router.get('/:koli_id', auth.verifyToken, KoliController.getDataById);

// REPLACE DATA KOLI BY ID
router.put('/:koli_id', auth.verifyToken, KoliController.updateData);

// DELETE DATA BY KOLI ID
router.delete('/:koli_id', auth.verifyToken, KoliController.delateData);

module.exports = router;