const { Joi } = require('../../include')

const getStockQueryValidator = Joi.object({
    page: Joi.alternatives().try(Joi.number(), Joi.strip()),
    itemCount: Joi.alternatives().try(Joi.number(), Joi.strip()),
    search: Joi.alternatives().try(Joi.string(), Joi.strip()),
    expiryStartDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    expiryEndDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip())
})

const getStockBulkValidator = Joi.object({
    query: Joi.array()
        .items(Joi.object({
            unit: Joi.objectId().optional(),
            id_goods: Joi.alternatives().try(Joi.objectId(), Joi.strip()).optional(),
            id_drugs: Joi.alternatives().try(Joi.objectId(), Joi.strip()).optional(),
            expiry_date: Joi.momentJS().optional(),
            batch_number: Joi.string().allow(null).optional()
        }))
        .required()
})

module.exports = {
    getStockQueryValidator,
    getStockBulkValidator
}