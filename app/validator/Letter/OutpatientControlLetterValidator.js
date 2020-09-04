const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const idUnitSchema = Joi.object({
    id_unit: Joi.objectId().required()
})

const requestOutpatientControlLetterSchema = Joi.object({
    id_unit: Joi.objectId().required(),
    allowed_to_return: Joi.string().trim().valid('sembuh', 'belum sembuh', 'aps').required(),
    chronic_status: Joi.string().trim().valid('30 hari', 'kurang dari 30 hari', 'non kronis').required(),
    control_date: Joi.momentJS().required(),
    diagnosis: Joi.array()
        .min(1)
        .items(Joi.objectId().required())
        .required(),
    therapies: Joi.array()
        .min(1)
        .items(Joi.string())
        .required(),
    suggestions: Joi.array()
        .min(1)
        .items(Joi.string())
        .required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestOutpatientControlLetterSchema,
    idUnitSchema
}
