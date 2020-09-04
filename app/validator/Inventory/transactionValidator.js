const { Joi } = require('../../include')

const getTransactionQueryValidator = Joi.object({
    page: Joi.alternatives().try(Joi.number(), Joi.strip()),
    itemCount: Joi.alternatives().try(Joi.number(), Joi.strip()),
    createdStartDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    createdEndDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    confirmedStartDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    confirmedEndDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip())
})

const getTransactionByIdValidator = Joi.object({
    id_transaction: Joi.objectId().required()
})

const getTransactionValidator = Joi.object({
    to: Joi.objectId().optional(),
    from: Joi.objectId().optional(),
    action: Joi.string().valid('transfer', 'mutasi', 'opname', 'koreksi', 'restock', 'consume', 'kirim').required(),
    status: Joi.string().valid('requested', 'accepted', 'rejected', 'received', 'resolved').optional()
}).or('to', 'from')

const addTransactionValidator = Joi.object({
    to: Joi.objectId().optional(),
    from: Joi.objectId().optional(),
    action: Joi.string().valid('transfer', 'mutasi', 'opname', 'koreksi', 'restock', 'consume', 'kirim').required(),
    is_opname_full: Joi.when('action', {
        is: Joi.string().valid('opname'),
        then: Joi.boolean().required(),
        otherwise: Joi.forbidden()
    }),
    status: Joi.string().valid('requested', 'accepted', 'rejected', 'received', 'resolved').required(),
    reason: Joi.string().optional(),
    items: Joi.when('action', {
        is: Joi.string().valid('opname', 'koreksi'),
        then: Joi.array()
            .items(Joi.object({
                id_goods: Joi.objectId().allow(null),
                id_drugs: Joi.objectId().allow(null),
                quantity: Joi.number().min(1).required(),
                expiry_date: Joi.momentJS().required(),
                package: Joi.string().required(),
                batch_number: Joi.string().allow(null).required(),
                reason: Joi.string().optional(),
                old_stock: Joi.number().required()
            }))
            .optional(),
        otherwise: Joi.array()
            .items(Joi.object({
                id_goods: Joi.objectId().allow(null),
                id_drugs: Joi.objectId().allow(null),
                quantity: Joi.number().min(1).required(),
                expiry_date: Joi.momentJS().required(),
                package: Joi.string().required(),
                batch_number: Joi.string().allow(null).required(),
                reason: Joi.string().optional()
            }))
            .optional()
    }),
    created_by: Joi.objectId().required(),
    confirmed_at: Joi.momentJS().optional(),
    confirmed_by: Joi.objectId().optional()
}).or('to', 'from')

const updateTransactionValidator = Joi.object({
    _id: Joi.objectId().optional(),
    is_opname_full: Joi.when('action', {
        is: Joi.string().valid('opname'),
        then: Joi.boolean().optional(),
        otherwise: Joi.forbidden()
    }),
    status: Joi.string().valid('requested', 'accepted', 'rejected', 'received', 'resolved').optional(),
    reason: Joi.string().optional(),
    items: Joi.when('action', {
        is: Joi.string().valid('opname', 'koreksi'),
        then: Joi.array()
            .items(Joi.object({
                id_goods: Joi.objectId().allow(null),
                id_drugs: Joi.objectId().allow(null),
                quantity: Joi.number().min(1).required(),
                expiry_date: Joi.momentJS().required(),
                package: Joi.string().required(),
                batch_number: Joi.string().allow(null).required(),
                reason: Joi.string().optional(),
                old_stock: Joi.number().required()
            }))
            .optional(),
        otherwise: Joi.array()
            .items(Joi.object({
                id_goods: Joi.objectId().allow(null),
                id_drugs: Joi.objectId().allow(null),
                quantity: Joi.number().min(1).required(),
                expiry_date: Joi.momentJS().required(),
                package: Joi.string().required(),
                batch_number: Joi.string().allow(null).required(),
                reason: Joi.string().optional()
            }))
            .optional()
    }),
    confirmed_at: Joi.momentJS().optional(),
    confirmed_by: Joi.objectId().optional()
}).options({ stripUnknown: true })

module.exports = {
    getTransactionValidator,
    addTransactionValidator,
    updateTransactionValidator,
    getTransactionQueryValidator,
    getTransactionByIdValidator
}