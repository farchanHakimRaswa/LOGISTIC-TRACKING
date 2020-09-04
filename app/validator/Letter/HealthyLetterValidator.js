const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestHealthyLetterSchema = Joi.object({
    patient_condition: Joi.string().valid('sakit', 'sehat').required(),
    date_created: Joi.momentJS().required(),
    height: Joi.number().min(1).required(),
    weight: Joi.number().min(1).required(),
    sistole: Joi.number().min(1).required(),
    diastole: Joi.number().min(1).required(),
    pulse: Joi.number().min(1).required(),
    respiration: Joi.number().min(1).required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestHealthyLetterSchema
}
