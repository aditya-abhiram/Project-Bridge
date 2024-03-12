const studentdb = require("../model/studentSchema");
const teacherdb = require("../model/teacherSchema");
const projectdb = require("../model/projectSchema");
const likesdb = require("../model/likesSchema");

exports.getData = async (req, res) => {
    // Logic for fetching Student data
    try {
        const studentId = req.params.userId;
        const student = await studentdb.findOne({ studentId });
    
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
        const studentId = req.params.userId;
        const { name, idNumber, degree, firstDegree, secondDegree, cg } = req.body;
    
        const updatedStudent = await studentdb.findOneAndUpdate(
          { studentId },
          { name, idNumber, degree, firstDegree, secondDegree, cg },
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

exports.getProjectsData = async (req, res) => {
  try {
    // Fetch all projects from projects collection
    const projects = await projectdb.find();

    // Fetch all teachers from teachers collection
    const teachers = await teacherdb.find();

    // Fetch student details based on userId from URL
    const { userId } = req.params;

    const student = await studentdb.findOne({ studentId: userId });
    if (!student) {
      // Handle the case where student is not found
      console.error('Student not found');
      res.status(404).json({ message: 'Student not found' });
      return; // Exit the function early
  }
    // Format the data as required
    const projectBankData = projects.map(project => {
        // Find teacher details for the project
        const teacher = teachers.find(teacher => teacher.teacherId === project.teacherId);

        // Check eligibility based on student's cg
        const cgEligibility = parseFloat(student.cg) >= parseFloat(project.cg_cutoff) ? 'Eligible' : 'Not Eligible';

        return {
            project_name: project.project_name,
            project_description: project.project_description,
            project_type: project.project_type,
            project_domain: project.project_domain,
            teacher_name: teacher ? teacher.name : 'Unknown',
            department: teacher ? teacher.department : 'Unknown',
            pre_requisites: project.pre_requisites,
            cg_cutoff: project.cg_cutoff,
            cg_eligibility: cgEligibility
        };
    });

    res.json(projectBankData);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}
};

exports.getLikedProjects = async(req, res) => {
  const { studentId, projectId } = req.params;
  try {
      const like = await likesdb.findOne({ studentId });
      if (!like) {
          return res.status(404).send('Like not found');
      }
      const liked = like.likedProjects.includes(projectId);
      res.status(200).send({ liked });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
}
exports.saveLikedProjects = async(req, res) => {
  console.log("backend test1");
  const { studentId, projectId } = req.body;
    try {
        let like = await likesdb.findOne({ studentId });
        console.log("backend test2");
        if (!like) {
          console.log("backend test3");
            like = new likesdb({ studentId, likedProjects: [projectId] });
        } else {
          console.log("backend test4");
          console.log("backend test 5, projectId", projectId , studentId);
            // if (!like.likedProjects.includes(projectId)) {
            //   console.log("backend test5");
                like.likedProjects.push(projectId);
        }
        await like.save();
        res.status(201).send(like);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.deleteLikedProjects = async(req, res) => {
  const { studentId, projectId } = req.params;
    try {
        let like = await likesdb.findOne({ studentId });
        if (!like) {
            return res.status(404).send('Like not found');
        }
        like.likedProjects = like.likedProjects.filter(id => id !== projectId);
        await like.save();
        res.status(200).send(like);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}