const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userId: String,
    idNumber: String,
    branch: String
});

const studentdb = mongoose.model("student", studentSchema);

module.exports = studentdb;
