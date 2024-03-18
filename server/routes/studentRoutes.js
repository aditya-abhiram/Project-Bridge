const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");


router.get("/getData/:userId", studentController.getData);
router.put("/updateData/:userId", studentController.updateData);
router.get('/projectBank/:userId',studentController.getProjectsData);
router.get('/getLiked/:studentId', studentController.getLikedProjects);
router.post('/saveLiked/:studentId/:projectId', studentController.saveLikedProjects);
router.delete('/removeLiked/:studentId/:projectId', studentController.deleteLikedProjects);
router.post('/saveDraft', studentController.saveDrafts);
router.get('/getDraft/:studentId/:projectId', studentController.getDraftDetails);
module.exports = router;