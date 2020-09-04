const { Joi } = require('../../include')

const idRegistrationSchema = Joi.object({
    id_registration: Joi.objectId().required()
})

const idOrderDietSchema = Joi.object({
    id_order_diet: Joi.objectId().required()
})

const idPatientSchema = Joi.object({
    id_patient: Joi.objectId().required()
})

const addOrderDietSchema = Joi.object({
    id_patient: Joi.objectId(),
    detail_registration: Joi.array()
        .min(1)
        .items(Joi.object({
            id_registration: Joi.objectId().required(),
            detail_information: Joi.array()
                .min(1)
                .items(Joi.object({
                    note: Joi.string(),
                    consistence: Joi.string().min(1).valid('Biasa', 'Cair', 'Saring', 'Lunak').required(),
                    class: Joi.string().required(),
                    staple_food: Joi.string().min(1).valid('Nasi', 'Tim', 'Bubur Kasar', 'Bubur Kecap', 'Bubur Saring', 'Susu', 'Jus Buah', 'Blender', 'Air Es', 'Air Gula', 'Air Putih', 'Teh').required(),
                    selection_menu: Joi.string().min(1).valid('Menu Standar', 'Menu Paket 1', 'Menu Paket 2', 'Menu Paket 3').required(),
                    diet_type: Joi.array()
                        .min(1)
                        .items(Joi.string().valid('Rendah Garam', 'Diet Jantung', 'Diabetes Melitus', 'Diet Lambung', 'Diet Hati', 'Rendah Sisa', 'Diet Ginjal', 'Rendah Purin', 'DMRG', 'DMDJ', 'Tinggi Serat', 'Tinggi Protein', 'Rendah Vitamin K', 'Rendah Lemak'))
                        .required(),
                    another_additionas: Joi.array()
                        .min(1)
                        .items(Joi.string().valid('Tidak Ada', 'Extra Susu', 'Extra Putih Telur', 'Extra Sayur', 'Extra Buah', 'Extra Agar-agar', 'Extra Es Krim'))
                        .required(),
                    eating_time: Joi.array()
                        .min(1)
                        .items(Joi.string().valid('Makan Pagi', 'Snack Pagi', 'Makan Siang', 'Snack Sore', 'Makan Sore'))
                        .required(),
                    timestamps: Joi.object({
                        ordering_staff: Joi.objectId().required(),
                    })
                }))
                .required(),
        }))
        .required(),

})

const updateOrderDietSchema = Joi.object({
    note: Joi.string(),
    consistence: Joi.string().min(1).valid('Biasa', 'Cair', 'Saring', 'Lunak').required(),
    staple_food: Joi.string().min(1).valid('Nasi', 'Tim', 'Bubur Kasar', 'Bubur Kecap', 'Bubur Saring', 'Susu', 'Jus Buah', 'Blender', 'Air Es', 'Air Gula', 'Air Putih', 'Teh').required(),
    selection_menu: Joi.string().min(1).valid('Menu Standar', 'Menu Paket 1', 'Menu Paket 2', 'Menu Paket 3').required(),
    diet_type: Joi.array()
        .min(1)
        .items(Joi.string())
        .required(),
    another_additionas: Joi.array()
        .min(1)
        .items(Joi.string().valid('Tidak Ada', 'Extra Susu', 'Extra Putih Telur', 'Extra Sayur', 'Extra Buah', 'Extra Agar-agar', 'Extra Es Krim'))
        .required(),
    eating_time: Joi.array()
        .min(1)
        .items(Joi.string().valid('Makan Pagi', 'Snack Pagi', 'Makan Siang', 'Snack Sore', 'Makan Sore'))
        .required(),
    timestamps: Joi.object({
        nutritionists: Joi.objectId().required(),
    })
})



module.exports = {
    idRegistrationSchema,
    idPatientSchema,
    addOrderDietSchema,
    idOrderDietSchema,
    updateOrderDietSchema
}