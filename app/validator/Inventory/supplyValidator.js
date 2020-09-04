const { Joi } = require('../../include')

const getSupplyQueryValidator = Joi.object({
    page: Joi.alternatives().try(Joi.number(), Joi.strip()),
    itemCount: Joi.alternatives().try(Joi.number(), Joi.strip()),
    search: Joi.alternatives().try(Joi.string(), Joi.strip()),
    startDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    endDate: Joi.alternatives().try(Joi.momentJS(), Joi.strip()),
    supplierId: Joi.alternatives().try(Joi.objectId(), Joi.strip())
})

module.exports = {
    getSupplyQueryValidator
}