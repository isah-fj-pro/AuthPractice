const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true

    },

    role:{
        type: String,
        enum: ['user','admin'], 
        default: 'user'
    }


}, { timestamps: true })

module.exports = moongose.model('User',UserSchema);