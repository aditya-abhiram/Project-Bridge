const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    userId: String,
    name: String,
    roomNumber: String,
    department: String
});

const teacherdb = mongoose.model("teacher", teacherSchema);

module.exports = teacherdb;
