const include = require("../../include");
const config = require("../../config")
const _ = include._
const Constant = require('../../constant')

const moment = include.moment;
const url = config.URL;

const LocationModel = require("../../models/Location/LocationModel");

const startDay = () => moment().startOf("day").format();
const endDay = () => moment().endOf("day").format();


async function getAllData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        let isExists = await LocationModel.find()
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
        let location_code = req.params.location_code

        let isExists = await LocationModel.findOne({ location_code: location_code })
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
        let locationData = new LocationModel(data)
        let dataIsNotValid = locationData.validateSync()
        if (dataIsNotValid) return res.status(400).json(Constant.badRequest("Input tidak valid!"))

        let isExists = await LocationModel.findOne({ location_code: data.location_code }).lean()
        if (!isExists) {

            let savedData = await locationData.save()
            res.status(200).json({
                pesan: "Lokasi berhasil di daftarkan",
                savedData
            })
        } else {
            res.status(400).json(Constant.customMessage("Lokasi Sudah tersedia"))
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}

async function updateData(req, res, next) {
    try {
        let { location_code, location_name } = req.body
        let updated = await LocationModel.findOneAndUpdate({ location_code: location_code }, { $set: { location_name: location_name } }, { new: true })
        if (!!updated) {
            res.status(200).json(Constant.customMessage("Berhasil mengubah nama lokasi!"))
        } else {
            res.status(404).json(Constant.customMessage("Kode Lokasi tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function delateData(req, res, next) {
    try {
        let deleted = await LocationModel.findOneAndDelete({ location_code: req.params.location_code }).lean()
        if (!!deleted) {
            res.status(200).json(Constant.customMessage("Lokasi berhasil dihapus!"))
        } else {
            res.status(404).json(Constant.errorNotFound("Lokasi tidak ditemukan"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}


exports.getAllData = getAllData;
exports.getDataById = getDataById
exports.addData = addData;
exports.updateData = updateData;
exports.delateData = delateData;