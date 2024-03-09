const studentdb = require("../model/studentSchema");

exports.getData = async (req, res) => {
    // Logic for fetching Student data
    try {
        const userId = req.params.userId;
        const student = await studentdb.findOne({ userId });
    
        if (!student) {
          res.status(404).json({ error: "Student not found" });
          return;
        }
    
        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
};

exports.updateData = async (req, res) => {
    // Logic for updating Student data
    try {
        const userId = req.params.userId;
        const { name, idNumber, degree, firstDegree, secondDegree } = req.body;
    
        const updatedStudent = await studentdb.findOneAndUpdate(
          { userId },
          { name, idNumber, degree, firstDegree, secondDegree },
          { new: true }
        );
    
        if (!updatedStudent) {
          res.status(404).json({ error: "Student not found" });
          return;
        }
    
        res.status(200).json(updatedStudent);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
};