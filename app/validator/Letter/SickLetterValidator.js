const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestSickLetterSchema = Joi.object({
    date_start: Joi.momentJS().required(),
    date_end: Joi.momentJS().required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestSickLetterSchema
}
