const include = require('../../include');

const mongoose = include.mongoose;
const autoIncrement = include.autoIncrement;
const moment = include.moment;

const koliSchema = new mongoose.Schema({
    koli_id: { type: String, required: true, unique: true },
    koli_code: { type: String, default: null },
    koli_length: { type: Number, default: 0 },
    koli_chargeable_weight: { type: Number, default: 0 },
    koli_width: { type: Number, default: 0 },
    koli_surcharge: [{ type: String, default: '' }],
    koli_height: { type: Number, default: 0 },
    koli_description: { type: String, default: '' },
    koli_formula_id: { type: String, default: null },
    koli_volume: { type: Number, default: 0 },
    koli_weight: { type: Number, default: 0 },
    koli_custom_field: {
        awb_sicepat: { type: String, default: null },
        harga_barang: { type: String, default: null },
    },
    awb_url: { type: String, default: '' },
    connote_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Connote' },
    created_at: { type: String, default: () => moment().format() },
    updated_at: { type: String, default: () => moment().format() },
})


const Koli = mongoose.model('Koli', koliSchema);

module.exports = Koli;