const include = require("../../include");
const config = require("../../config")
const _ = include._
const Constant = require('../../constant')

const moment = include.moment;
const url = config.URL;

const CustomerModel = require("../../models/Customer/CustomerModel");

const startDay = () => moment().startOf("day").format();
const endDay = () => moment().endOf("day").format();



async function getAllData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        let isExists = await CustomerModel.find()
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
        let _id = req.params._id

        let isExists = await CustomerModel.findById(_id)
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
        let customerData = new CustomerModel(data)
        let dataIsNotValid = customerData.validateSync()
        if (dataIsNotValid) return res.status(400).json(Constant.badRequest("Input tidak valid!"))

        let isExists = await CustomerModel.findOne({ customer_name: data.customer_name }).lean()
        if (!isExists) {

            let savedData = await customerData.save()
            res.status(200).json({
                pesan: "Kustomer berhasil di daftarkan",
                savedData
            })
        } else {
            res.status(400).json(Constant.customMessage("Kustomer Sudah tersedia"))
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(Constant.errorServer)
    }
}

async function updateData(req, res, next) {
    try {
        let customer_id = req.params.customer_id
        let query = req.body
        let updated = await CustomerModel.findByIdAndUpdate(customer_id, { $set: query }, { new: true })
        if (!!updated) {
            res.status(200).json(Constant.customMessage("Berhasil mengubah nama kustomer!"))
        } else {
            res.status(404).json(Constant.customMessage("kustomer tidak ditemukan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

async function delateData(req, res, next) {
    try {
        let deleted = await CustomerModel.findOneAndDelete({ customer_id: req.params.customer_id }).lean()
        if (!!deleted) {
            res.status(200).json(Constant.customMessage("Kustomer berhasil dihapus!"))
        } else {
            res.status(404).json(Constant.errorNotFound("Kustomer tidak ditemukan"))
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