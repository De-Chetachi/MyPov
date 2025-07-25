const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

UserSchema = new Schema({
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

    image: {
        type: String,
    },

    bio: {
        type: String,
        required: false,
    },

    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        }
    }
});

UserSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);
