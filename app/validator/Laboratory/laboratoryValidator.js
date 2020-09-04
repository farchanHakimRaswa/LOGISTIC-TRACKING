const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const orderNumberSchema = Joi.object({
    order_number: Joi.string().required()
})

const getLaboratoryQueryValidator = Joi.object({
    page: Joi.alternatives().try(Joi.number(), Joi.strip()),
    itemCount: Joi.alternatives().try(Joi.number(), Joi.strip()),
    search: Joi.alternatives().try(Joi.string(), Joi.strip())
})

const requestLaboratorySchema = Joi.object({
    is_pending: Joi.boolean().required(),
    is_request_locked: Joi.boolean().optional(),
    detail_examination_request: Joi.when('is_pending', {
        is: Joi.boolean().valid(true),
        then: Joi.object({
            is_cito: Joi.boolean().required(),
            schedule: Joi.momentJS().required(),
            diagnosis: Joi.objectId().required(),
            interventions: Joi.array().items(Joi.objectId()).required(),
            created_by: Joi.objectId().required()
        }),
        otherwise: Joi.object({
            is_cito: Joi.boolean().required(),
            schedule: Joi.strip(),
            diagnosis: Joi.objectId().required(),
            interventions: Joi.array().items(Joi.objectId()).required(),
            created_by: Joi.objectId().required()
        })
    }).optional(),
    created_by: Joi.objectId().required()
})

const editLaboratorySchema = Joi.object({
    is_request_locked: Joi.boolean().optional(),
    detail_examination_request: Joi.object({
        is_cito: Joi.boolean().required(),
        schedule: Joi.momentJS().optional(),
        diagnosis: Joi.objectId().required(),
        interventions: Joi.array().items(Joi.objectId()).required(),
        created_by: Joi.objectId().required()
    })
}).options({ stripUnknown: true })

const migrateOrderSchema = Joi.object({
    id_registration: Joi.objectId().required(),
    order_number: Joi.string().regex(/\d+/).required()
})

module.exports = {
    idRegistrationSchema,
    getLaboratoryQueryValidator,
    requestLaboratorySchema,
    orderNumberSchema,
    editLaboratorySchema,
    migrateOrderSchema
}