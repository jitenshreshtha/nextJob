const express = require("express");
const {
  addjob,
  getAllJobs,
  semanticSearch,
  getMyJobs,
  getJobById,
} = require("../controllers/jobController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/addJob", verifyToken, addjob);
router.get("/allJobs", getAllJobs);
router.post("/semanticSearch", semanticSearch);
router.get("/getMyJobs", verifyToken, getMyJobs);
router.get('/:id', getJobById);

module.exports = router;
