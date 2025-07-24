import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/job/${id}`);
        if (response.status === 200) {
          setJob(response.data);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Type:</strong> {job.jobType}
      </p>
      <p>
        <strong>Salary:</strong> {job.salaryRange}
      </p>
      <p>
        <strong>Posted on:</strong>{" "}
        {new Date(job.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Description:</strong> {job.jobDescription}
      </p>
      <p>
        <strong>Requirements:</strong> {job.requirements}
      </p>
      <p>
        <strong>Benefits:</strong> {job.benefits}
      </p>
      <p>
        <strong>Contact Email:</strong> {job.contactEmail}
      </p>
    </div>
  );
}

export default JobDetailsPage;
