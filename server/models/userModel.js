const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },

    // image: {
    //     data: Buffer,
    //     contentType: String,
    //     required: false,
    // },

    bio: {
        type: String,
        required: false,
    },

    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    console.log(this);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    console.log(salt, hash);
    this.password = hash;
    console.log(this);
    next();
});

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);