const include = require('../include');
const ConnoteController = require('../controller/Connote/ConnoteController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// ADD DATA Connote
router.post('/', auth.verifyToken, ConnoteController.addData);

// GET ALL DATA Connote
router.get('/', auth.verifyToken, ConnoteController.getAllData);

// GET  DATA Connote BY ID
router.get('/:connote_id', auth.verifyToken, ConnoteController.getDataById);

// REPLACE DATA Connote BY ID
router.put('/:connote_id', auth.verifyToken, ConnoteController.updateData);

// DELETE DATA BY Connote ID
router.delete('/:connote_id', auth.verifyToken, ConnoteController.delateData);

module.exports = router;