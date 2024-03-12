const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    idNumber: String,
    degree: String,
    firstDegree: String,
    secondDegree: String,
    cg: String,
});

const studentdb = mongoose.model("student", studentSchema);

module.exports = studentdb;
