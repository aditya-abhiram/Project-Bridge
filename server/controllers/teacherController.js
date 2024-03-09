const teacherdb = require("../model/teacherSchema")

exports.getData = async (req, res) => {
    // Logic for fetching Teacher data
    try {
        const userId = req.params.userId;
        const teacher = await teacherdb.findOne({ userId });
    
        if (!teacher) {
          res.status(404).json({ error: "Teacher not found" });
          return;
        }
    
        res.status(200).json(teacher);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
};

exports.updateData = async (req, res) => {
    // Logic for updating Teacher data
    try {
        const userId = req.params.userId;
        const { name, block, roomNumber, department } = req.body;
    
        const updatedTeacher = await teacherdb.findOneAndUpdate(
          { userId },
          { name, block, roomNumber, department },
          { new: true }
        );
    
        if (!updatedTeacher) {
          res.status(404).json({ error: "Teacher not found" });
          return;
        }
    
        res.status(200).json(updatedTeacher);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
};