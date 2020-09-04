const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const orderNumberSchema = Joi.object({
    no_order: Joi.string().required()
})

const updateTypeSchema = Joi.object({
	update_type: Joi.string().valid('request', 'result').required()
})

const radiologyRequestSchema = Joi.object({
	is_pending: Joi.boolean().optional(),
	is_accepted: Joi.boolean().optional(),
	schedule: Joi.string().optional(),
	created_by: Joi.objectId().optional(),
    detail_request: Joi.object({
        diagnosis: Joi.array().min(1),
		status_radiology: Joi.string().valid('normal', 'cito_tanpa_expertise', 'cito_dengan_expertise').required(),
		cranium: Joi.object({
			cranium: Joi.string().optional(),
			tmj: Joi.string().optional(),
			mastoid: Joi.string().optional(),
			orbita: Joi.string().optional(),
			schuller_mastois: Joi.string().optional(),
			panoramic: Joi.string().optional(),
			os_nassal: Joi.boolean().optional(),
			mandibulla: Joi.boolean().optional(),
			sinus_paranassals: Joi.boolean().optional(),
			waters: Joi.boolean().optional()
		}),
		vertebrae: Joi.object({
			cervical: Joi.string().optional(),
			sacrum: Joi.string().optional(),
			coccygis: Joi.string().optional(),
			lumbal_sacral: Joi.string().optional(),
			thoraco_umbral: Joi.string().optional(),
			lumbal: Joi.string().optional(),
			cervio_thoracal: Joi.string().optional(),
			thoracal: Joi.string().optional(),
		}),
		thorax_abdomen: Joi.object({
			thorax_erect: Joi.string().optional(),
			abdomen_akut: Joi.string().optional(),
			thorax: Joi.string().optional(),
			thorax_supine: Joi.string().optional(),
			costae: Joi.string().optional(),
			thorax_top_lordotic: Joi.boolean().optional(),
			abdomen: Joi.boolean().optional(),
			bno: Joi.boolean().optional(),
			pelvis: Joi.boolean().optional()
		}),
		upper_extremity: Joi.object({
			shoulder_joint: Joi.string().optional(),
			scapula: Joi.string().optional(),
			manus: Joi.string().optional(),
			clavicula: Joi.string().optional(),
			wrist_joint: Joi.string().optional(),
			humerus: Joi.string().optional(),
			elbow_joint: Joi.string().optional(),
			antebrachi: Joi.string().optional(),
		}),
		lower_extremity: Joi.object({
			hip_joint: Joi.string().optional(),
			pedis: Joi.string().optional(),
			ankle_joint: Joi.string().optional(),
			genu: Joi.string().optional(),
			genu_weight_bearing: Joi.boolean().optional(),
			cruris: Joi.string().optional(),
			femur: Joi.string().optional(),
			pedis_weight_bearing: Joi.string().optional(),
			calcaneus: Joi.string().optional(),
		}),
		contrast: Joi.object({
			bno_ivp: Joi.boolean().optional(),
			maag_duodenum: Joi.boolean().optional(),
			lopografi: Joi.boolean().optional(),
			collon_in_loop: Joi.boolean().optional(),
			oesophagography: Joi.boolean().optional(),
			appendicografi: Joi.boolean().optional(),
			hsg: Joi.boolean().optional(),
			rpg_apg: Joi.boolean().optional(),
			uretrocystografi: Joi.boolean().optional(),
			follow_through: Joi.boolean().optional(),
			cystography: Joi.boolean().optional(),
			omd: Joi.boolean().optional(),
			fisutulography: Joi.boolean().optional(),
		}),
		ct_scan: Joi.object({
			non_contrast: Joi.boolean().optional(),
			head_axial: Joi.boolean().optional(),
			head_axial_boneset: Joi.boolean().optional(),
			head_axial_coronal: Joi.boolean().optional(),
			orbita_axial_coronal: Joi.boolean().optional(),
			contrast: Joi.boolean().optional(),
			sinus_paranassal: Joi.boolean().optional(),
			vert_cervical: Joi.boolean().optional(),
			vert_thoracal: Joi.boolean().optional(),
			vert_lumbal_sacral: Joi.boolean().optional(),
			thorax: Joi.boolean().optional(),
			upper_abdomen: Joi.boolean().optional(),
			lower_abdomen: Joi.boolean().optional(),
			whole_abdomen: Joi.boolean().optional(),
			ct_colon: Joi.boolean().optional(),
			extremity: Joi.boolean().optional(),
		}),
		ultrasonography: Joi.object({
			abdomen: Joi.boolean().optional(),
			thyroid: Joi.boolean().optional(),
			upper_abdomen: Joi.boolean().optional(),
			doppler: Joi.boolean().optional(),
			lower_abdomen: Joi.boolean().optional(),
			scrotum: Joi.boolean().optional(),
			mamae: Joi.boolean().optional(),
        }),
        timestamps: Joi.object({
		    created_by: Joi.objectId().required()
        })
    })
	.optional()
	.default([])
})


const radiologyResultSchema = Joi.object({
    detail_result: Joi.object({
		result: Joi.object({
			examination_result: Joi.string().required(),
			impressions: Joi.string().required(),
		}),
		timestamps: Joi.object({
			created_by: Joi.objectId().required()
		})
	})
})

const changeFlagSchema = Joi.object({
	id_registration: Joi.objectId().required(),
	no_order: Joi.string().regex(/\d+/).required(),
	changeFlagType: Joi.string().valid('finish', 'pending').required(),
})

module.exports = {
    idRegistrationSchema,
	orderNumberSchema,
	updateTypeSchema,
	radiologyRequestSchema,
	radiologyResultSchema,
	changeFlagSchema
}
