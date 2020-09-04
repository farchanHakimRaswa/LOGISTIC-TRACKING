const { Joi } = require('../../include')

const uploadBodySchema = Joi.object({
    identifier: Joi.string().alphanum().required(),
    tag: Joi.string().alphanum().required()
})

const getUploadedSchema = Joi.object({
    identifier: Joi.string().alphanum(),
    tag: Joi.string().alphanum()
})

const deleteUploadSchema = Joi.object({
    file_id: Joi.array().items(Joi.objectId()).required()
})

module.exports = {
    uploadBodySchema,
    getUploadedSchema,
    deleteUploadSchema
}