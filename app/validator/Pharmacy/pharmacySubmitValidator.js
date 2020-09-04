const { Joi } = require('../../include')

const racikSchema = Joi.object({
    is_received: Joi.boolean().valid(true).required(),
    is_created: Joi.boolean().valid(true).required(),
    is_submitted: Joi.boolean().required(),
    _id: Joi.objectId().required(),
    name: Joi.string().min(1).required(),
    amount_given: Joi.number().min(0).required(),
    amount_unit: Joi.string().min(1).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().min(1).required(),
    description: Joi.array().items(Joi.string()),
    drugs: Joi.array()
        .min(1)
        .items(Joi.object({
            _id: Joi.objectId().required(),
            id_drugs: Joi.objectId().required(),
            dosage: Joi.number().min(1).required(),
            dosage_unit: Joi.string().min(1).required(),
            amount: Joi.number().min(1).required()
        }))
        .required(),
    drug_correction_reason: Joi.string().optional(),
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
    is_received: Joi.boolean().valid(true).required(),
    is_created: Joi.boolean().valid(true).required(),
    is_submitted: Joi.boolean().required(),
    _id: Joi.objectId().required(),
    amount_given: Joi.number().min(0).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().required(),
    description: Joi.array().items(Joi.string()),
    id_drugs: Joi.objectId().min(1).required(),
    dosage: Joi.string().min(1).required(),
    dosage_unit: Joi.string().min(1).required(),
    drug_correction_reason: Joi.string().optional(),
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
    is_received: Joi.boolean().valid(true).required(),
    is_created: Joi.boolean().valid(true).required(),
    is_submitted: Joi.boolean().required(),
    _id: Joi.objectId().required(),
    amount_given: Joi.number().min(0).required(),
    id_drugs: Joi.objectId().min(1).required(),
    created_by: Joi.objectId().required()
}).options({ allowUnknown: true })

const finalCorrectionSchema = Joi.object({
    notes: Joi.string().optional(),
    true_patient: Joi.number().min(0).max(1).required(),
    true_drug: Joi.number().min(0).max(1).required(),
    true_dosage: Joi.number().min(0).max(1).required(),
    true_gift: Joi.number().min(0).max(1).required(),
    true_time_gift: Joi.number().min(0).max(1).required(),
    true_documentation: Joi.number().min(0).max(1).required()
})

const pharmacySubmitValidator = Joi.object({
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
        .optional(),
    final_correction: finalCorrectionSchema
})

module.exports = {
    pharmacySubmitValidator,
}