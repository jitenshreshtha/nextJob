const express = require("express");
const { addjob, getAllJobs, semanticSearch } = require("../controllers/jobController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/addJob", verifyToken, addjob);
router.get('/allJobs',getAllJobs);
router.post("/semanticSearch",semanticSearch);

module.exports = router;
