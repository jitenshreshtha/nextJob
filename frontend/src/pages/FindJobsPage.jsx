import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import JobCard from "../components/Jobcard";
import axios from "axios";

function FindJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/job/allJobs");
        if (response.status === 200) {
          setJobs(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length > 0 ? (
          <div className="job-cards-container">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default FindJobsPage;
