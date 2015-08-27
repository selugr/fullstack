'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  likes: {type: Number},
  dislikes: {type: Number},
  img: String
  /*active: Boolean*/
});

module.exports = mongoose.model('Thing', ThingSchema);