// JobCard.jsx
import React from "react";
import "../styles/Jobcard.css";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-company-info">
          <div className="job-card-logo">
            <i className="ri-building-line"></i>
          </div>
          <div className="job-card-title-section">
            <h3 className="job-card-title">{job.title}</h3>
            <p className="job-card-company">{job.companyName}</p>
          </div>
        </div>
        <div className="job-card-date-badge">
          <p className="job-card-date">Posted on: {formatDate(job.applicationDeadline)}</p>
        </div>
      </div>

      <div className="job-card-details">
        <div className="job-card-meta">
          <span className="job-card-meta-item">
            <i className="ri-map-pin-line"></i>
            {job.location}
          </span>
          <span className="job-card-meta-item">
            <i className="ri-time-line"></i>
            {job.jobType}
          </span>
          <span className="job-card-meta-item">
            <i className="ri-money-dollar-circle-line"></i>
            ${job.salaryRange}
          </span>
        </div>
      </div>

      <p className="job-card-description">{truncateText(job.jobDescription, 120)}</p>

      <div className="job-card-actions">
        <Link to={`/job/${job._id}`} className="job-card-link">
          <button className="job-card-apply">Apply Now</button>
        </Link>
        <button className="job-card-favorite">
          <i className="ri-heart-line"></i>
        </button>
      </div>
    </div>
  );
};
export default JobCard;