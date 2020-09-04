const include = require('../include');

const Staff = require('./../models/staffModel');
const config = require('../config');
const Constant = require('../constant.js')
const _ = include._

const jwt = include.jwt;
const bcrypt = include.bcrypt;

// Get all staffs data
async function getStaffData(req, res, next) {
    try {
        let { skips, limits } = Constant.getPagination(req.query)
        var query = {}

        let staffs = await Staff.find(query).skip(skips).limit(limits).lean()

        if (staffs.length < 1) {
            res.status(404).json(Constant.errorNotFound("Data staff"));
        } else {
            let data = staffs.map(staff => {
                let detail = staff.detail[0]
                delete detail.password
                return {
                    id: staff._id,
                    nip: staff.nip,
                    detail,
                    detail_role: staff.role[0]
                }
            })
            res.status(200).json(Constant.successWithData("Data staff ditemukan!", data, 'data', await Staff.countDocuments(query)))
        }
    } catch (error) {
        res.status(500).json(Constant.errorServer)
    }
}

// Get staff data by ID
async function getStaffDataById(req, res, next) {
    try {
        let id_staff = req.params.id_staff;
        let staffFind = await Staff.findById(id_staff).populate({
            path: 'role.poly',
            select: 'detail.name'
        }).lean()

        if (!staffFind) {
            res.status(404).json({
                pesan: "Data User tidak ditemukan"
            });
        } else {
            delete staffFind.detail[0].password

            res.status(200).json({
                pesan: "Data User ditemukan",
                data: {
                    id: staffFind._id,
                    nip: staffFind.nip,
                    detail: staffFind.detail[0],
                    detail_role: staffFind.role[0]
                }
            });
        }
    } catch (error) {
        res.status(500).json(Constant.errorServer)
    }
}

// Staff register
async function staffRegister(req, res, next) {
    try {
        let data = req.body
        let hashed = bcrypt.hashSync(data.detail[0].password, 12)
        data.detail[0].password = hashed

        let newStaff = new Staff(data)
        let dataIsNotValid = newStaff.validateSync()

        if (dataIsNotValid) return res.status(400).json(Constant.badRequest("Input tidak valid!"))

        let isExists = await Staff.findOne({ nip: data.nip }).lean()
        if (!isExists) {
            await newStaff.save()
            let tokenStaff = {
                id: _.get(newStaff, 'id'),
                nip: _.get(newStaff, 'nip'),
                name: _.get(newStaff, 'detail[0].name'),
                role: {
                    primary: _.get(newStaff, 'role[0].primary'),
                    poly_id: _.get(newStaff, 'role[0].poly'),
                }
            }

            let token = jwt.sign({ tokenStaff }, config.SECRET, { expiresIn: '86400s' })
            res.status(200).json(Constant.successWithData("Staff berhasil didaftarkan!", token, 'token'))
        } else {
            res.status(403).json(Constant.customMessage("Staff sudah terdaftarkan!"))
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

// Staff login
async function staffLogin(req, res, next) {
    try {
        let staff = await Staff.findOne({ nip: req.body.nip })

        if (!!staff) {
            if (await bcrypt.compare(req.body.password, staff.detail[0].password)) {
                let tokenStaff = {
                    id: _.get(staff, 'id'),
                    nip: _.get(staff, 'nip'),
                    name: _.get(staff, 'detail[0].name'),
                }

                let token = jwt.sign({ tokenStaff }, config.SECRET, { expiresIn: '86400s' })
                res.status(200).json({
                    token,

                })
            } else {
                res.status(404).json(Constant.errorLoginFail)
            }
        } else {
            res.status(404).json(Constant.errorLoginFail)
        }
    } catch (err) {
        res.status(500).json(Constant.errorServer)
    }
}

// FOR STAFF UPDATE DATA
async function staffUpdate(req, res, next) {
    try {
        let data = req.body
        let staffData = new Staff(data);
        let errData = staffData.validateSync();

        if (!errData) {
            let staffFind = await Staff.findOne({ nip: data.nip })

            if (!staffFind) {
                res.status(404).json(Constant.errorNotFound('Staff'))
            } else {
                staffFind.detail.unshift(data.detail[0])
                staffFind.role.unshift(data.role[0])
                staffFind.save()

                res.status(200).json(Constant.successWithData('Data staff berhasil diperbaharui'))
            }
        } else {
            res.status(400).json(Constant.badRequest('Data harus diisi dengan benar!'))
        }
    } catch (error) {
        res.status(500).json(Constant.errorServer)
    }
}



exports.getStaffData = getStaffData;
exports.getStaffDataById = getStaffDataById;
exports.staffRegister = staffRegister;
exports.staffLogin = staffLogin;
exports.staffUpdate = staffUpdate;