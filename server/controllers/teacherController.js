const requestsdb = require("../model/requestSchema");
const studentdb = require("../model/studentSchema");
const teacherdb = require("../model/teacherSchema");
const projectdb = require("../model/projectSchema");

exports.getData = async (req, res) => {
    // Logic for fetching Teacher data
    try {
        const teacherId = req.params.userId;
        const teacher = await teacherdb.findOne({ teacherId });
    
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
        const teacherId = req.params.userId;
        const { name, block, roomNumber, department } = req.body;
    
        const updatedTeacher = await teacherdb.findOneAndUpdate(
          { teacherId },
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

exports.projectRequests = async (req, res) => {
  try {
    const teacherId = req.params.userId;

    // Step 1: Retrieve projects for the given teacherId
    const projects = await projectdb.find({ teacherId });

    // Check if no projects found
    if (!projects || projects.length === 0) {
        return res.status(404).json({ message: 'No projects found for the given teacher' });
    }

    // Initialize data array to store results
    const data = [];

    // Iterate through projects
    for (const project of projects) {
        const projectId = project._id;

        // Retrieve requests for the current project
        const projectRequests = await requestsdb.findOne({ projectId });

        // Check if no requests found for the project
        if (!projectRequests) {
            // Push project data without requests
            data.push({
                project,
                requestsData: []
            });
            continue; // Skip to next iteration
        }

        // Retrieve student info for each request along with additional fields from requestsdb
        const requestsData = [];
        for (const request of projectRequests.requests) {
            const studentId = request.studentId;

            // Retrieve student info for the current request
            const studentInfo = await studentdb.findOne({ studentId });

            // Get additional fields from requestsdb
            const requestData = {
                studentId,
                studentInfo,
                reason_to_do_project: request.reason_to_do_project,
                pre_requisites_fulfilled: request.pre_requisites_fullfilled
            };

            requestsData.push(requestData);
        }

        // Push project data with requests
        data.push({
            project,
            requestsData
        });
    }

    res.json(data);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
};
