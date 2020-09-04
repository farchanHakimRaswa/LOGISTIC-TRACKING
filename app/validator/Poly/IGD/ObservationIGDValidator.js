const { Joi } = require('../../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestObservationSchema = Joi.object({
    pacs: Joi.number().valid(1, 2, 3, 4).required(),
    airway: Joi.string().required(),
    breathing: Joi.string().required(),
    circulation: Joi.string().required(),
    disability: Joi.string().required(),
    observations: Joi.array()
        .min(1)
        .items(Joi.object({
            created_at: Joi.momentJS(),
            gcs: Joi.number().required(),
            sistole: Joi.number().required(),
            diastole: Joi.number().required(),
            pulse: Joi.number().required(),
            respiration: Joi.number().required(),
            temperature: Joi.number().required(),
            spo2: Joi.number().required(),
            urine: Joi.number().required(),
            description: Joi.string()
        }))
        .required(),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestObservationSchema
}