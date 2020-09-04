const include = require("../../include");
const config = require("../../config")
const _ = include._
const Constant = require('../../constant')

const moment = include.moment;
const url = config.URL;

const ConnoteModel = require("../../models/Connote/ConnoteModel");

const startDay = () => moment().startOf("day").format();
const endDay = () => moment().endOf("day").format();


async function getAllData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        let isExists = await ConnoteModel.find()
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
        let connote_id = req.params.connote_id

        let isExists = await ConnoteModel.findOne({ connote_id: connote_id })
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
        let connoteData = new ConnoteModel(data)
        let dataIsNotValid = connoteData.validateSync()
        if (dataIsNotValid) return res.status(400).json(Constant.badRequest(dataIsNotValid))

        let isExists = await ConnoteModel.findOne({ connote_id: data.connote_id }).lean()
        if (!isExists) {

            let savedData = await connoteData.save()
            res.status(200).json({
                pesan: "connote berhasil di daftarkan",
                savedData
            })
        } else {
            res.status(400).json(Constant.customMessage("connote Sudah tersedia"))
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}

async function updateData(req, res, next) {
    try {
        let connote_id = req.params.connote_id
        let query = req.body
        let updated = await ConnoteModel.findOneAndUpdate({ connote_id: connote_id }, { $set: query }, { new: true })
        if (!!updated) {
            res.status(200).json(Constant.customMessage("Berhasil mengubah nama connote!"))
        } else {
            res.status(404).json(Constant.customMessage("Kode connote tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function delateData(req, res, next) {
    try {
        let deleted = await ConnoteModel.findOneAndDelete({ connote_id: req.params.connote_id }).lean()
        if (!!deleted) {
            res.status(200).json(Constant.customMessage("connote berhasil dihapus!"))
        } else {
            res.status(404).json(Constant.errorNotFound("connote tidak ditemukan"))
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