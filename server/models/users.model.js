"use strict"

const mongoose = require('mongoose');
var Schema     = mongoose.Schema;

var usersSchema = new Schema({
  username  : { type: String, required: true, unique: true},
  password  : { type: String, required: true}
},
{
  timestamps : true
})

var Users = mongoose.model('Users', usersSchema)

module.exports = Users;
