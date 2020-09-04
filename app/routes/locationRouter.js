const include = require('../include');
const LocationController = require('../controller/Location/LocationController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// ADD DATA LOCATION
router.post('/', auth.verifyToken, LocationController.addData);

// GET ALL DATA LOCATION
router.get('/', auth.verifyToken, LocationController.getAllData);

// GET  DATA LOCATION BY ID
router.get('/:location_code', auth.verifyToken, LocationController.getDataById);

// REPLACE DATA LOCATION BY ID
router.put('/:location_code', auth.verifyToken, LocationController.updateData);

// DELETE DATA BY LOCATION ID
router.delete('/:location_code', auth.verifyToken, LocationController.delateData);

module.exports = router;