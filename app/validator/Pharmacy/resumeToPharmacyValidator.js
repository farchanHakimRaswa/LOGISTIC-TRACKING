const { Joi } = require('../../include')

const racikSchema = Joi.object({    
    name: Joi.string().min(1).required(),
    amount_given: Joi.number().min(0).required(),
    amount_demanded: Joi.number().min(0).required(),
    amount_returned: Joi.number().min(0).required(),
    drugs: Joi.array()
        .min(1)
        .items(Joi.object({
            id_drugs: Joi.objectId().required(),
            dosage: Joi.number().min(1).required(),
            dosage_unit: Joi.string().min(1).required(),
            amount: Joi.number().min(1).required()
        }))
        .required(),
    created_by: Joi.objectId().required()
}).options({ allowUnknown: true })

const nonRacikSchema = Joi.object({
    amount_given: Joi.number().min(0).required(),
    amount_demanded: Joi.number().min(0).required(),
    amount_returned: Joi.number().min(0).required(),
    id_drugs: Joi.objectId().min(1).required(),
    dosage: Joi.string().min(1).required(),
    dosage_unit: Joi.string().min(1).required(),
    created_by: Joi.objectId().required()
}).options({ allowUnknown: true })

const consumableSchema = Joi.object({
    amount_given: Joi.number().min(0).required(),
    amount_demanded: Joi.number().min(0).required(),
    amount_returned: Joi.number().min(0).required(),
    id_drugs: Joi.objectId().min(1).required(),
    created_by: Joi.objectId().required()
}).options({ allowUnknown: true })

const resumeToPharmacyValidator = Joi.object({
    patient_status: Joi.string().valid('jalan', 'inap', 'igd').required(),
    racik: Joi.array()
        .items(racikSchema)
        .default([])
        .optional(),
    nonracik: Joi.array()
        .items(nonRacikSchema)
        .default([])
        .optional(),
    consumables: Joi.array()
        .items(consumableSchema)
        .default([])
        .optional()
})

module.exports = {
    resumeToPharmacyValidator
}