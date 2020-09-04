const include = require('../include');

const mongoose = include.mongoose;
const moment = include.moment;

const staffSchema = new mongoose.Schema({
    nip: { type: String },
    detail: [{
        _id: false,
        name: { type: String },
        nik: { type: String },
        password: { type: String },
        address: { type: String },
        gender: { type: Boolean },
        religion: { type: String, enum: ['Budha', 'Hindu', 'Islam', 'Katolik', 'Konghucu', 'Kristen'] },
        phone_no: { type: String },
        birth: {
            city: { type: String },
            date: { type: String }
        },
        timestamps: {
            created_at: { type: String, default: () => moment().format() },
            created_by: { type: String, default: 'admin' }
        }
    }],
})

staffSchema.virtual('specialize', {
    ref: 'Specialize',
    localField: 'detail.specialize',
    foreignField: 'code',
    justOne: true
})

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;