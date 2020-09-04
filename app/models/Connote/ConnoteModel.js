const include = require('../../include');

const mongoose = include.mongoose;
const autoIncrement = include.autoIncrement;
const moment = include.moment;

const connoteSchema = new mongoose.Schema({
    connote_id: { type: String, required: true, unique: true },
    connote_number: { type: Number, default: 0 },
    connote_service: { type: String, default: '' },
    connote_service_price: { type: Number, default: 0 },
    connote_amount: { type: Number, default: 0 },
    connote_code: { type: String, default: '' },
    connote_booking_code: { type: String, default: '' },
    connote_order: { type: Number, default: 0 },
    connote_state: { type: String, default: '' },
    connote_state_id: { type: Number, default: 0 },
    zone_code_from: { type: String, default: '' },
    zone_code_to: { type: String, default: '' },
    surcharge_amount: { type: String, default: null },
    actual_weight: { type: Number, default: 0 },
    volume_weight: { type: Number, default: 0 },
    chargeable_weight: { type: Number, default: 0 },
    organization_id: { type: Number, default: 0 },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    connote_total_package: { type: String, default: '' },
    connote_surcharge_amount: { type: String, default: '' },
    connote_sla_day: { type: String, default: '' },
    location_name: { type: String, default: '' },
    location_type: { type: String, default: '' },
    source_tariff_db: { type: String, default: '' },
    id_source_tariff: { type: String, default: '' },
    pod: { type: String, default: null },
    history: [{
        type: String
    }],
    created_at: { type: String, default: () => moment().format() },
    updated_at: { type: String, default: () => moment().format() },

})


const Connote = mongoose.model('Connote', connoteSchema);

module.exports = Connote;