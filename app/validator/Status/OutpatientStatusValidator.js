const { Joi } = require('../../include')

const idPatientSchema = Joi.object({
    id_patient: Joi.objectId().required()
})

module.exports = {
    idPatientSchema
}