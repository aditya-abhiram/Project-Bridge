const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/getData/:userId", teacherController.getData);
router.put("/updateData/:userId", teacherController.updateData);


module.exports = router;