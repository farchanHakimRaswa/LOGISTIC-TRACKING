const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const idPatientSchema = Joi.object({
    id_patient: Joi.objectId().required()
})

const isTakeHomeSchema = Joi.object({
    is_take_home: Joi.boolean().required()
})

const patientStatusSchema = Joi.object({
    patient_status: Joi.string().valid('jalan', 'inap', 'igd').required()
})

const typeOfStageSchema = Joi.object({
    typeOfStage: Joi.string().valid('receive', 'create', 'submit').required()
})

const typeOfOrderSchema = Joi.object({
    typeOfOrder: Joi.string().valid('racik', 'nonracik', 'consumables').required()
})

module.exports = {
    idRegistrationSchema,
    idPatientSchema,
    isTakeHomeSchema,
    patientStatusSchema,
    typeOfStageSchema,
    typeOfOrderSchema
}