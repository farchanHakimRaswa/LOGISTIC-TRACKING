const { multer, path, uuid } = require('../include')
const Config = require('../config')
const MAX_FILE_SIZE = 2 * 1000 * 1000

const storage = multer.diskStorage({
    destination: Config.UPLOAD_PATH,
    filename: function (_req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})

const fileFilter = function (req, file, cb) {
    const allowedMimeTypes = [
        'image/bmp', 'image/gif', 'image/png', 'image/jpeg',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf', 'text/csv', 'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'
    ]

    if (allowedMimeTypes.includes(file.mimetype))
        cb(null, true)
    else
        return cb(new Error(`Wrong file type ${path.extname(file.originalname)}`))
}

const limits = { fileSize: MAX_FILE_SIZE }

const upload = multer({ storage, fileFilter, limits })

module.exports = upload