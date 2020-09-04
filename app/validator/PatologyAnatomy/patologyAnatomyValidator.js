const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const orderNumberSchema = Joi.object({
    order_number: Joi.string().required()
})

const getPatologyAnatomyQueryValidator = Joi.object({
    page: Joi.alternatives().try(Joi.number(), Joi.strip()),
    itemCount: Joi.alternatives().try(Joi.number(), Joi.strip()),
    search: Joi.alternatives().try(Joi.string(), Joi.strip())
})

const requestPatologyAnatomySchema = Joi.object({
    detail_examination_request: Joi.object({
        extracted_body: Joi.string().valid('biopsi', 'extirpasi', 'kerokan', 'operasi', 'pungsi'),
        puncture_description: Joi.string().required(),
        localization: Joi.string().required(),
        clinic_diagnosis: Joi.objectId().required(),
        clinic_description: Joi.string().required(),
        cytology_preparations: Joi.object({
            checklist: Joi.array().items(Joi.boolean()),
            other: Joi.string()
        }).required(),
        malignancy: Joi.object({
            xray: Joi.number(),
            endoscopy: Joi.number(),
            clinic_evaluation: Joi.number()
        }).required(),
        pap_smear: Joi.object({
            latest_menstruation: Joi.string(),
            parity: Joi.number().min(1).max(10),
            is_pregnant: Joi.boolean(),
            clinical: Joi.array().items(Joi.boolean()),
            therapy: {
                hormonal: Joi.string(),
                contraception: Joi.object({
                    oral: Joi.string(),
                    iud: Joi.string(),
                    date: Joi.momentJS()
                }),
                radiation: Joi.object({
                    description: Joi.string(),
                    date: Joi.momentJS()
                })
            },
            histopatology_examination: Joi.object({
                location: Joi.string(),
                date: Joi.momentJS(),
                pa_number: Joi.string()
            })
        }).required(),
        created_by: Joi.objectId().required()
    }).required()
})

const editPatologyAnatomySchema = Joi.object({
    detail_examination_request: Joi.object({
        extracted_body: Joi.string().valid('biopsi', 'extirpasi', 'kerokan', 'operasi', 'pungsi'),
        puncture_description: Joi.string().required(),
        localization: Joi.string().required(),
        clinic_diagnosis: Joi.objectId().required(),
        clinic_description: Joi.string().required(),
        cytology_preparations: Joi.object({
            checklist: Joi.array().items(Joi.boolean()),
            other: Joi.string()
        }).required(),
        malignancy: Joi.object({
            xray: Joi.number(),
            endoscopy: Joi.number(),
            clinic_evaluation: Joi.number()
        }).required(),
        pap_smear: Joi.object({
            latest_menstruation: Joi.string(),
            parity: Joi.number().min(1).max(10),
            is_pregnant: Joi.boolean(),
            clinical: Joi.array().items(Joi.boolean()),
            therapy: {
                hormonal: Joi.string(),
                contraception: Joi.object({
                    oral: Joi.string(),
                    iud: Joi.string(),
                    date: Joi.momentJS()
                }),
                radiation: Joi.object({
                    description: Joi.string(),
                    date: Joi.momentJS()
                })
            },
            histopatology_examination: Joi.object({
                location: Joi.string(),
                date: Joi.momentJS(),
                pa_number: Joi.string()
            })
        }).required(),
        created_by: Joi.objectId().required()
    }),
    detail_examination_result: Joi.object({
        microscopic: Joi.string().required(),
        macroscopic: Joi.string().required(),
        conclusion: Joi.string().required(),
        suggestion: Joi.string().required(),
        created_by: Joi.objectId().required()
    })
}).xor('detail_examination_request', 'detail_examination_result').options({ stripUnknown: true })

module.exports = {
    idRegistrationSchema,
    getPatologyAnatomyQueryValidator,
    requestPatologyAnatomySchema,
    orderNumberSchema,
    editPatologyAnatomySchema
}