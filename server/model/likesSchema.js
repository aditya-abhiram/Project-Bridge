const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    studentId: String,
    likedProjects: Array
});

const likesdb = mongoose.model("likesdb", likesSchema);

module.exports = likesdb;
