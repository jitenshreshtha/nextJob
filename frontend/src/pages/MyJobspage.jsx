import axios from "axios";
import React, { useState, useEffect } from "react";
import JobCard from "../components/Jobcard";
import { useNavigate } from "react-router-dom";

function MyJobspage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/job/getMyJobs",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setJobs(response.data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const handleWhoApplied = async (jobId) => {
    navigate(`/job/${jobId}/applicantlist`);

  };

  return (
    <div>
      <h2>My Job Posts</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.companyName}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Status:</strong> Applied
              </p>
              <p>
                <button onClick={() =>handleWhoApplied(job._id)}>See who applied</button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyJobspage;
