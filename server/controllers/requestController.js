const requestsdb = require("../model/requestSchema");

exports.storeRequest = async (req, res) => {
    try {
        const { projectId, studentId } = req.params;
        const { reason_to_do_project, pre_requisites_fullfilled } = req.body;
    
        let requestDoc = await requestsdb.findOne({ projectId });
    
        if (!requestDoc) {
          requestDoc = new requestsdb({ projectId, requests: [] });
        }
    
        requestDoc.requests.push({
          studentId,
          reason_to_do_project,
          pre_requisites_fullfilled,
        });
    
        await requestDoc.save();
    
        res.status(200).json({ message: "Request stored successfully" });
      } catch (error) {
        console.error("Error storing request:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};