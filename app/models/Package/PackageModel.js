const include = require('../../include');

const mongoose = include.mongoose;
const autoIncrement = include.autoIncrement;
const moment = include.moment;

const packageSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true, unique: true },
    customer_name: { type: String, default: '' },
    customer_code: { type: String, default: '' },
    transaction_amount: { type: String, default: '' },
    transaction_discount: { type: Number, default: 0 },
    transaction_additional_field: { type: String, default: '' },
    transaction_payment_type: { type: String, default: '' },
    transaction_state: { type: String, default: '' },
    transaction_code: { type: String, default: '' },
    transaction_order: { type: Number, default: 0 },
    transaction_payment_type_name: { type: String, default: '' },
    transaction_cash_amount: { type: Number, default: 0 },
    transaction_cash_change: { type: Number, default: 0 },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    organization_id: { type: Number, default: 0 },
    customer_attribute: {
        Nama_Sales: { type: String, default: '' },
        TOP: { type: String, default: '' },
        Jenis_Pelanggan: { type: String, default: '' },
    },
    connote: { type: mongoose.Schema.Types.ObjectId, ref: 'Connote' },
    origin_data: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    destination_data: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    koli_data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Koli' }],
    custom_field: {
        catatan_tambahan: { type: String, default: null },
    },
    currentLocation: {
        name: { type: String, default: '' },
        code: { type: String, default: '' },
        type: { type: String, default: '' },
    },
    created_at: { type: String, default: () => moment().format() },
    updated_at: { type: String, default: () => moment().format() },

})


const Package = mongoose.model('Package', packageSchema);

module.exports = Package;