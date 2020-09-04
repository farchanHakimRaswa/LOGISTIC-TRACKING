const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const orderNumberSchema = Joi.object({
    order_number: Joi.string().regex(/\d+/).required(),
})

const requestBloodTransfusionSchema = Joi.object({
    is_accepted: Joi.boolean().required(),
    transfusion_request: Joi.object({
        doctor: Joi.objectId().required(),
        diagnosis: Joi.objectId().required(),
        blood_type: Joi.string().valid('AB', 'A', 'B', 'O').required(),
        rhesus: Joi.boolean().required(),
        transfusion_request: Joi.array()
            .min(1)
            .items(Joi.object({
                transfusion_type: Joi.string().required(),
                amount: Joi.number().required()
            })),
        created_by: Joi.objectId().required()
    })
    .required()
})

const updateDataSchema = Joi.object({
	order_number: Joi.string().regex(/\d+/).required(),
    transfusion_type: Joi.string().valid('transfusion_request', 'transfusion_examination').required()
})

const requestInExaminationSchema = Joi.object({
    received_until: Joi.string().required(),
    recipient_atp_pttd: Joi.string().required(),
})

const examinationBloodTypeSchema = Joi.object({
    antisera: Joi.object({
        anti_a: Joi.boolean().required(),
        anti_b: Joi.boolean().required()
    }),
    suspensi_sel_5: Joi.object({
        sel_a: Joi.boolean().required(),
        sel_b: Joi.boolean().required(),
        sel_o: Joi.boolean().required()
    }),
    rhesus_factor: Joi.object({
        anti_d_igm: Joi.boolean().required(),
        b_alb_6: Joi.boolean().required()
    }),
    examination: Joi.object({
        blood_type: Joi.string().valid('AB', 'A', 'B', 'O').required(),
        rhesus: Joi.boolean().required()
    })
})

const examinationCrossMatchSchema = Joi.object({
    bag_number: Joi.string().required(),
    aft_date: Joi.string().optional(),
    donor_blood_type: Joi.string().valid('AB', 'A', 'B', 'O').required(),
    cross_match_method: Joi.string().valid('tube_test', 'gell_test').required(),
    mayor: Joi.string().valid('+1', '+2', '+3', '+4', 'negatif').required(),
    minor: Joi.string().valid('+1', '+2', '+3', '+4', 'negatif').required(),
    auto_control: Joi.string().valid('+1', '+2', '+3', '+4', 'negatif').required(),
    auto_pool: Joi.string().valid('+1', '+2', '+3', '+4', 'negatif').required(),
    informations: Joi.string().optional(),
    cross_match_result: Joi.string().valid('compatible', 'incompatible', 'tanpa_cross')
})

const bloodTransfusionExamination = Joi.object({
    transfusion_request: requestInExaminationSchema,
    examination_blood_type: examinationBloodTypeSchema,
    examination_cross_match: Joi.array()
        .items(examinationCrossMatchSchema)
        .default([])
        .optional(),
})

module.exports = {
    idRegistrationSchema,
    orderNumberSchema,
    requestBloodTransfusionSchema,
    updateDataSchema,
    bloodTransfusionExamination
}
