const include = require("../../include");
const config = require("../../config")
const _ = include._
const Constant = require('../../constant')

const moment = include.moment;
const url = config.URL;

const PackageModel = require("../../models/Package/PackageModel");

const startDay = () => moment().startOf("day").format();
const endDay = () => moment().endOf("day").format();


async function getAllData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        let isExists = await PackageModel.find()
            .populate(["location_id", "connote", "origin_data", "destination_data", "koli_data"])
            .skip(skips).limit(limits).lean()
        if (!isExists) {
            res.status(404).json(Constant.customMessage("transaction tidak tersedia"))
        } else {
            res.status(200).json({
                pesan: "transaction tersedia",
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
        let transaction_id = req.params.transaction_id

        let isExists = await PackageModel.findOne({ transaction_id: transaction_id })
            .populate(["location_id", "connote", "origin_data", "destination_data", "koli_data"])
            .lean()
        if (!isExists) {
            res.status(404).json(Constant.customMessage("transaction tidak tersedia"))
        } else {
            res.status(200).json({
                pesan: "transaction tersedia",
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
        let packageData = new PackageModel(data)
        let dataIsNotValid = packageData.validateSync()
        if (dataIsNotValid) return res.status(400).json(Constant.badRequest("Input tidak valid!"))

        let isExists = await PackageModel.findOne({ transaction_id: data.transaction_id }).lean()
        if (!isExists) {

            let savedData = await packageData.save()
            res.status(200).json({
                pesan: "transaction berhasil di daftarkan",
                savedData
            })
        } else {
            res.status(400).json(Constant.customMessage("transaction Sudah tersedia"))
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}

async function putData(req, res, next) {
    try {
        let transaction_id = req.params.transaction_id
        let query = req.body
        let updated = await PackageModel.findOneAndUpdate({ transaction_id: transaction_id }, { $set: query }, { new: true })
        if (!!updated) {
            res.status(200).json({
                pesan: "Berhasil mengubah data transaction!",
                updated

            })
        } else {
            res.status(404).json(Constant.customMessage("Kode transaction tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function patchDataKoli(req, res, next) {
    try {
        let transaction_id = req.params.transaction_id
        let update = {
            $push: {
                koli_data: {
                    $each: [req.body.koli_data],
                    $position: 0
                }
            }
        }
        let updated = await PackageModel.findOneAndUpdate({ transaction_id: transaction_id }, update, { new: true })
        if (!!updated) {
            res.status(200).json({
                pesan: "Berhasil mengubah data transaction!",
                updated

            })
        } else {
            res.status(404).json(Constant.customMessage("Kode transaction tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function delateData(req, res, next) {
    try {
        let deleted = await PackageModel.findOneAndDelete({ transaction_id: req.params.transaction_id }).lean()
        if (!!deleted) {
            res.status(200).json(Constant.customMessage("transaction berhasil dihapus!"))
        } else {
            res.status(404).json(Constant.errorNotFound("transaction tidak ditemukan"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}



exports.addData = addData;
exports.getAllData = getAllData;
exports.getDataById = getDataById;
exports.putData = putData;
exports.patchDataKoli = patchDataKoli;
exports.delateData = delateData;