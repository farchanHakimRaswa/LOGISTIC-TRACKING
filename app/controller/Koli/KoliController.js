const include = require("../../include");
const config = require("../../config")
const _ = include._
const Constant = require('../../constant')

const moment = include.moment;
const url = config.URL;

const KoliModel = require("../../models/Koli/KoliModel");

const startDay = () => moment().startOf("day").format();
const endDay = () => moment().endOf("day").format();



async function getAllData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        let isExists = await KoliModel.find()
            .skip(skips).limit(limits).lean()
        if (!isExists) {
            res.status(404).json(Constant.customMessage("data tidak tersedia"))
        } else {
            res.status(200).json({
                pesan: "data tersedia",
                data: isExists
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}
async function getDataById(req, res, next) {
    try {
        let koli_id = req.params.koli_id

        let isExists = await KoliModel.findOne({ koli_id: koli_id })
            .lean()
        if (!isExists) {
            res.status(404).json(Constant.customMessage("data tidak tersedia"))
        } else {
            res.status(200).json({
                pesan: "data tersedia",
                data: isExists
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}
async function addData(req, res, next) {
    try {
        let data = req.body
        let koliData = new KoliModel(data)
        let dataIsNotValid = koliData.validateSync()
        if (dataIsNotValid) return res.status(400).json(Constant.badRequest(dataIsNotValid))

        let isExists = await KoliModel.findOne({ koli_id: data.koli_id }).lean()
        if (!isExists) {

            let savedData = await koliData.save()
            res.status(200).json({
                pesan: "Koli berhasil di daftarkan",
                savedData
            })
        } else {
            res.status(400).json(Constant.customMessage("Koli Sudah tersedia"))
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}

async function updateData(req, res, next) {
    try {
        let koli_id = req.params.koli_id
        let query = req.body
        let updated = await KoliModel.findOneAndUpdate({ koli_id: koli_id }, { $set: query }, { new: true })
        if (!!updated) {
            res.status(200).json(Constant.customMessage("Berhasil mengubah nama koli!"))
        } else {
            res.status(404).json(Constant.customMessage("Kode koli tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function delateData(req, res, next) {
    try {
        let deleted = await KoliModel.findOneAndDelete({ koli_id: req.params.koli_id }).lean()
        if (!!deleted) {
            res.status(200).json(Constant.customMessage("Koli berhasil dihapus!"))
        } else {
            res.status(404).json(Constant.errorNotFound("Koli tidak ditemukan"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}


exports.getAllData = getAllData;
exports.getDataById = getDataById;
exports.addData = addData;
exports.updateData = updateData;
exports.delateData = delateData;