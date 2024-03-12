const { Double } = require("mongodb");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  teacherId: String,
  project_name: String,
  project_type: String,
  project_description: String,
  project_domain: String,
  cg_cutoff: String,
  pre_requisites: Array
});

const projectdb = mongoose.model("project", projectSchema);

module.exports = projectdb;
