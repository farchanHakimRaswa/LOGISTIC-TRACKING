const include = require('../../include');

const mongoose = include.mongoose;
const autoIncrement = include.autoIncrement;
const moment = include.moment;

const customerSchema = new mongoose.Schema({
    customer_name: { type: String, default: '', unique: true },
    customer_address: { type: String, default: '' },
    customer_email: { type: String, default: '' },
    customer_phone: { type: String, default: '' },
    customer_address_detail: { type: String, default: null },
    customer_zip_code: { type: String, default: '' },
    zone_code: { type: String, default: '' },
    organization_id: { type: Number, default: 0 },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
})


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;