const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const requestExternalReferralLetterLetterSchema = Joi.object({
    referral_type: Joi.string().trim().valid('rujuk puskesmas', 'rujuk rs').required(),
    detail_puskesmas: Joi.when('referral_type', {
        is: Joi.string().valid('rujuk puskesmas'),
        then: Joi.object({
            referred_instance: Joi.string().required(),
            doctor: Joi.string().required(),
            diagnosis_in: Joi.objectId().required(),
            diagnosis_out: Joi.objectId().required(),
            therapy: Joi.string().required(),
            suggestion: Joi.string().required()
        }).required(),
        otherwise: Joi.forbidden()
    }),
    detail_hospital: Joi.when('referral_type', {
        is: Joi.string().valid('rujuk rs'),
        then: Joi.object({
            referral_destination: Joi.object({
                doctor: Joi.string().required(),
                id_hospital: Joi.objectId().required(),
                officer: Joi.string().required(),
                time: Joi.time().required(),
            }).required(),
            referral_reason: Joi.object({
                clinical: Joi.string(),
                non_clinical: Joi.object({
                    selected: Joi.number(),
                    other: Joi.string()
                })
            }).required(),
            patient_medical_information: Joi.object({
                anamnesis: Joi.string(),
                physical_examination: Joi.string(),
                disease_history: Joi.string(),
                diagnosis: Joi.array()
                    .items(Joi.objectId())
            }).required(),
            patient_condition: Joi.object({
                general_condition: Joi.string(),
                awareness: Joi.number(),
                gcs_score: Joi.number(),
                sistole: Joi.number(),
                diastole: Joi.number(),
                pulse: Joi.number(),
                respiration: Joi.number(),
                temperature: Joi.number()
            }).required(),
            nursery: Joi.object({
                given_action: Joi.string(),
                given_drugs: Joi.array()
                    .items(Joi.object({
                        time: Joi.time(),
                        drug_name: Joi.string()
                    }))
            }).required(),
            support: Joi.object({
                laboratory: Joi.string(),
                ekg: Joi.string(),
                radiology: Joi.string(),
                other: Joi.string()
            }).required()
        }).required(),
        otherwise: Joi.forbidden()
    }),
    created_by: Joi.objectId().required()
})

module.exports = {
    idRegistrationSchema,
    requestExternalReferralLetterLetterSchema
}
