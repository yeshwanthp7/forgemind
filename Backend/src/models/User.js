const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['worker', 'manager', 'admin'],
        default: 'user',
    },
    avatar:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    department:{
        type: String,
        required: true,
    
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('User', User);