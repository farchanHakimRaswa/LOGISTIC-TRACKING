const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestDeathLetterLetterSchema = Joi.object({
    death_type: Joi.string().trim().valid('kematian', 'death on arrival').required(),
    type_of_disease: Joi.when('death_type', {
        is: Joi.string().valid('kematian'),
        then: Joi.string().trim().valid('menular', 'tidak menular').required(),
        otherwise: Joi.forbidden()
    }),
    date: Joi.momentJS().required(),
    time: Joi.time().required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestDeathLetterLetterSchema
}
