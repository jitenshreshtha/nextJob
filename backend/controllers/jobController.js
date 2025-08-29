const Job = require("../models/Job");
const User = require("../models/User");
const OpenAI = require("openai");

const openai = new OpenAI();

const generateEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
  }
};

//cosine similarit function
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

exports.addjob = async (req, res) => {
  const { title, company, jobDescription, location, benefits } = req.body;
  const combinedText = `${title} ${company} ${jobDescription} ${location} ${benefits}`;
  try {
    const embedding = await generateEmbedding(combinedText);
    const newJob = new Job({
      ...req.body,
      embedding,
      postedBy: req.user.userId,
    });
    await newJob.save();
    return res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.semanticSearch = async (req, res) => {
  const { query } = req.body;
  try {
    const searchEmbedding = await generateEmbedding(query);
    const allJobs = await Job.find();

    const scoredJobs = allJobs.map((job) => {
      const similarity = cosineSimilarity(job.embedding, searchEmbedding);
      return { ...job.toObject(), similarity };
    });

    const threshold = 0.85;
    const filteredJobs = scoredJobs.filter(
      (job) => job.similarity >= threshold
    );

    const sortedJobs = filteredJobs
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20);
    res.status(200).json(sortedJobs);

  } catch (error) {
    console.error("Error during semantic search:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const employerId = req.user.userId;
    const myJobs = await Job.find({ postedBy: employerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(myJobs);
  } catch (error) {
    console.error("Error fetching my jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("applicants", "_id name email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.applyforJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.applicants.includes(userId)) {
      return res.status(400).json({ error: "already applied for the job" });
    }
    job.applicants.push(userId);
    await job.save();

    const user = await User.findById(userId);

    if (!user.appliedJobs.includes(jobId)) {
      user.appliedJobs.push(jobId);
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "Applied for the job successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate("appliedJobs");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.appliedJobs);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.applicantList = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId).populate(
      "applicants",
      "_id name email"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job.applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
