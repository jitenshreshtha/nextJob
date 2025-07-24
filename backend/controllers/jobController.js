const Job = require("../models/Job");
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
    const sortedJobs = scoredJobs
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
  const {id}= req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
