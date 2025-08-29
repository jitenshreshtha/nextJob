const express = require("express");
const {
  addjob,
  getAllJobs,
  semanticSearch,
  getMyJobs,
  getJobById,
  applyforJob,
  getMyApplications,
  applicantList,
} = require("../controllers/jobController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/addJob", verifyToken, addjob);
router.get("/allJobs", getAllJobs);
router.post("/semanticSearch", semanticSearch);
router.get("/getMyJobs", verifyToken, getMyJobs);

router.post("/:id/apply", verifyToken, applyforJob);
router.get("/myApplications",verifyToken, getMyApplications);
router.get('/:id', getJobById);
router.get("/:id/applicantlist", verifyToken, applicantList);

module.exports = router;
