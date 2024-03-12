const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");


router.get("/getData/:userId", studentController.getData);
router.put("/updateData/:userId", studentController.updateData);
router.get('/projectBank/:userId',studentController.getProjectsData);
router.get('/getLiked/:studentId/:projectId', studentController.getLikedProjects);
router.post('/saveLiked', studentController.saveLikedProjects);
router.delete('/deleteLiked/:studentId/:projectId', studentController.deleteLikedProjects);
module.exports = router;