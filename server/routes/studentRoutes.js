const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/getData/:userId", studentController.getData);
router.put("/updateData/:userId", studentController.updateData);


module.exports = router;