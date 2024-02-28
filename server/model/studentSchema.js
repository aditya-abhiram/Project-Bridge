const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userId: String,
<<<<<<< HEAD
    name: String,
=======
>>>>>>> dab79fce21e4c2077b740e54a70ae5c26e5b2fc9
    idNumber: String,
    branch: String
});

const studentdb = mongoose.model("student", studentSchema);

module.exports = studentdb;
