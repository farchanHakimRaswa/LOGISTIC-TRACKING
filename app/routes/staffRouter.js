const include = require('../include');
const staffController = require('../controller/staffController');
const auth = require('./../middleware/authentication');
const router = include.express.Router();

const path = include.path
const mime = include.mime
const fs = include.fs

// FOR STAFF DATA ALL
router.get('/', auth.verifyToken, staffController.getStaffData);

// FOR STAFF DATA BY ID
router.get('/data/id/:id_staff', auth.verifyToken, staffController.getStaffDataById);

// FOR STAFF REGISTRATION
router.post('/register', staffController.staffRegister);

// FOR STAFF LOGIN
router.post('/login', staffController.staffLogin);

// FOR STAFF UPDATE DATA
router.post('/update', auth.verifyToken, staffController.staffUpdate);

module.exports = router;