const { Joi } = require('../../include')

const idDoctorStaffSchema = Joi.object({
    id_doctor: Joi.objectId().required()
})

const idDrugsSchema = Joi.object({
    id_drugs: Joi.objectId().required()
})

module.exports = {
    idDrugsSchema,
    idDoctorStaffSchema
}