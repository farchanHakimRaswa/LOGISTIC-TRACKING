const include = require('../../include');

const mongoose = include.mongoose;
const autoIncrement = include.autoIncrement;
const moment = include.moment;

const locationSchema = new mongoose.Schema({
    location_code: { type: String, required: true, unique: true },
    location_name: { type: String, default: '' },
    created_at: { type: String, default: () => moment().format() },
    updated_at: { type: String, default: () => moment().format() },
})


const Location = mongoose.model('Location', locationSchema);

module.exports = Location;