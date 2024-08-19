const mongoose = require('mongoose');
const { type } = require('os');
require('../db/config');

const studentSchema = new mongoose.Schema({
   
}, {strict:false}); 


const student = mongoose.model('student', studentSchema);


module.exports = student;
