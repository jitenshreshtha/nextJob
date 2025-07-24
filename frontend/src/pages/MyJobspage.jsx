import axios from "axios";
import React, { useState, useEffect } from "react";
import JobCard from "../components/Jobcard";

function MyJobspage() {
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
      }
      finally{
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div>
      <h2>My Job Posts</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
}

export default MyJobspage;
