const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type : String, requied: true},
    email: {type : String, requied: true, unique:true},
    password: {type : String, requied: true, unique:true},
    role: {type : String, default:'customer'},
},{timestamps: true});

module.exports = mongoose.model('User', userSchema,'users')