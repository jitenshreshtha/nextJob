import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/JobDetailsPage.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

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
  const handleApply = async () => {
    if (!user) {
      return navigate("/login");
    }
    if (job && user && job.applicants.includes(user.userId)) {
      return alert("You have already applied for this job.");
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/job/${id}/apply`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setApplied(true);
        toast.success("Successfully applied for the job!");
      }
      if (response.status === 400) {
        toast.error("already applied for the job");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        alert("Failed to apply for the job. Please try again later.");
      }
    }
  };

  return (
    <div className="job-page">
      <div className="job-card">
        <h1 className="job-title">{job.title}</h1>
        <div className="job-meta">
          <p>
            <i className="fa-solid fa-building"></i> {job.companyName}
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> {job.location}
          </p>
          <p>
            <i className="fa-solid fa-briefcase"></i> {job.jobType}
          </p>
          <p>
            <i className="fa-solid fa-dollar-sign"></i> {job.salaryRange}
          </p>
          <p>
            <i className="fa-solid fa-calendar-day"></i>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="job-section">
          <h3>Description</h3>
          <p>{job.jobDescription}</p>
        </div>

        <div className="job-section">
          <h3>Requirements</h3>
          <p>{job.requirements}</p>
        </div>

        <div className="job-section">
          <h3>Benefits</h3>
          <p>{job.benefits}</p>
        </div>

        <div className="job-contact">
          <p>
            <strong>Contact:</strong>{" "}
            <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
          </p>
        </div>

        <button className="apply-btn" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetailsPage;
