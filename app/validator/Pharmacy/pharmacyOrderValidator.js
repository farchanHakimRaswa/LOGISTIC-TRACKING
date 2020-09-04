const { Joi } = require('../../include')

const racikSchema = Joi.object({
    is_received: Joi.boolean().required(),
    is_created: Joi.boolean().strip(),
    is_submitted: Joi.boolean().strip(),
    name: Joi.string().min(1).required(),
    amount_demanded: Joi.number().min(0).required(),
    amount_unit: Joi.string().min(1).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().min(1).required(),
    description: Joi.array().items(Joi.string()),
    drugs: Joi.array()
        .min(1)
        .items(Joi.object({
            id_drugs: Joi.objectId().required(),
            dosage: Joi.number().min(1).required(),
            dosage_unit: Joi.string().min(1).required(),
            amount: Joi.number().min(1).required()
        }))
        .required(),
    created_by: Joi.objectId().required(),
    schedule: Joi.object({
        morning: Joi.string().optional(),
        noon: Joi.string().optional(),
        afternoon: Joi.string().optional(),
        night: Joi.string().optional(),
        next_morning: Joi.string().optional(),
        next_noon: Joi.string().optional(),
        next_afternoon: Joi.string().optional(),
        next_night: Joi.string().optional()
    }).optional()
}).options({ allowUnknown: true })

const nonRacikSchema = Joi.object({
    is_received: Joi.boolean().required(),
    is_created: Joi.boolean().strip(),
    is_submitted: Joi.boolean().strip(),
    amount_demanded: Joi.number().min(0).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().required(),
    description: Joi.array().items(Joi.string()),
    id_drugs: Joi.objectId().min(1).required(),
    dosage: Joi.string().min(1).required(),
    dosage_unit: Joi.string().min(1).required(),
    created_by: Joi.objectId().required(),
    schedule: Joi.object({
        morning: Joi.string().optional(),
        noon: Joi.string().optional(),
        afternoon: Joi.string().optional(),
        night: Joi.string().optional(),
        next_morning: Joi.string().optional(),
        next_noon: Joi.string().optional(),
        next_afternoon: Joi.string().optional(),
        next_night: Joi.string().optional()
    }).optional()
    
}).options({ allowUnknown: true })


const consumableSchema = Joi.object({
    is_received: Joi.boolean().required(),
    is_created: Joi.boolean().strip(),
    is_submitted: Joi.boolean().strip(),
    amount_demanded: Joi.number().min(0).required(),
    id_drugs: Joi.objectId().min(1).required(),
    created_by: Joi.objectId().required()
}).options({ allowUnknown: true })

const requestOrderPharmacy = Joi.object({
    patient_status: Joi.string().valid('jalan', 'inap', 'igd').required(),
    is_take_home: Joi.boolean().required(),
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
    requestOrderPharmacy
}