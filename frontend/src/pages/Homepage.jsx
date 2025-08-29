import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import JobCard from "../components/Jobcard";
import JobSearchBar from "../components/JobSearchBar";
import "../styles/Homepage.css";

function Homepage() {
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

  const handleSearch = async (searchFilters) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/job/semanticSearch",
        { query: searchFilters }
      );
      if (response.status === 200) {
        setJobs(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">
        Find your <span>Next Job</span>
      </h1>
      <JobSearchBar onSearch={handleSearch} />

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

export default Homepage;
