const include = require('./include')
const _ = include._

module.exports = {
    errorToken: { pesan: "Token tidak berlaku" },
    errorServer: { pesan: "Terjadi kesalahan di server" },
    errorNotFound: (msg) => { return { pesan: `${msg} tidak ditemukan!` } },
    successMessage: { pesan: "Success!" },
    errorLoginFail: { pesan: "Username atau password salah!" },
    badRequest: (msg) => { return { pesan: `Bad Request: ${msg}` } },
    deleteSuccess: (msg) => { return { pesan: `${msg} berhasil dihapus!` } },
    addSuccess: (msg) => { return { pesan: `${msg} berhasil ditambahkan!` } },
    successWithData: (msg, data, key, length = null) => {
        let ret = {
            pesan: `${msg}`
        }
        if (!!length) ret['length'] = length
        ret[key] = data
        return ret
    },
    customMessage: (msg) => { return { pesan: `${msg}` } },
    extractDetails: (e) => {
        let ret = {}
        for (key in e) {
            if (key == 'detail') {
                ret[key] = e[key][0]
                if (_.get(e[key][0], 'timestamps.created_by')) {
                    ret[key].timestamps.created_by = _.get(e[key][0], 'timestamps.created_by.detail[0].name')
                }
            } else
                ret[key] = e[key]
        }
        return ret
    },
    getPagination: (query) => {
        let limits = skips = 0
        let { sort: sorts } = query

        sorts = sorts == '' ? undefined : sorts
        if (query.page && query.itemCount) {
            skips = (parseInt(query.page) - 1) * parseInt(query.itemCount)
            limits = parseInt(query.itemCount)
        }
        return { limits, skips, sorts }
    },
    handlePathNotFound: (req, res, next) => {
        res.status(404).json({ pesan: `${req.method} ${req.originalUrl} tidak ditemukan!` })
    },
    databaseFilePath: 'static/uploads'
}