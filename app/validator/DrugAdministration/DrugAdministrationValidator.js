const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const idDrugAdministrationSchema = Joi.object({
    id_drug_administration: Joi.objectId().required()
})

const requestRacikSchema = Joi.object({
    name: Joi.string().min(1).required(),
    amount_demanded: Joi.number().min(1).required(),
    amount_unit: Joi.string().min(1).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().min(1).required(),
    description: Joi.array().items(Joi.string()),
    drugs: Joi.array()
        .min(1)
        .items(Joi.object({
            id_drugs: Joi.objectId().required(),
            dosage: Joi.number().min(0).required(),
            dosage_unit: Joi.string().required(),
            amount_used: Joi.number().min(0).required(),
            amount_billed: Joi.number().min(0).required()
        }))
        .required(),
    created_by: Joi.objectId().required()
})

const requestNonRacikSchema = Joi.object({
    amount_demanded: Joi.number().min(1).required(),
    route: Joi.string().min(1).required(),
    rules: Joi.number().min(1).required(),
    rules_unit: Joi.string().required(),
    description: Joi.array().items(Joi.string()),
    id_drugs: Joi.objectId().min(1).required(),
    dosage: Joi.string().min(1).required(),
    dosage_unit: Joi.string().min(1).required(),
    created_by: Joi.objectId().required()
})

const requestDrugHistorySchema = Joi.object({
    drugs: Joi.array()
        .min(1)
        .items(Joi.object({
            _id: Joi.objectId().min(1).required(),
            is_continued: Joi.boolean().required(),
            history: Joi.array()
                .items(Joi.object({
                    time: Joi.array()
                        .min(1)
                        .items(Joi.time())
                        .required(),
                    date: Joi.string().regex(/^\d{2}\-\d{2}\-\d{4}$/).required()
                }))
                .required(),
            created_by: Joi.objectId().required()
        }))
        .required()
}).options({ stripUnknown: true })

module.exports = {
    requestRacikSchema,
    requestNonRacikSchema,
    idRegistrationSchema,
    idDrugAdministrationSchema,
    requestDrugHistorySchema
}