const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestDiagnoseLetterSchema = Joi.object({
    diagnosis: Joi.objectId().required(),
    therapy: Joi.string().required(),
    follow_up: Joi.string().required(),
    date_in: Joi.momentJS().required(),
    date_out: Joi.momentJS().required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestDiagnoseLetterSchema
}
