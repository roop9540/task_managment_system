// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        enum: ['admin', 'manager', 'user'],
        default: ['user']
    },
    reporting_to:{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
}, { timestamps: true });

// Hash password before saving
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model('User', UserSchema);
