import React from "react";
import "../styles/JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-company-info">
          <div className="job-card-logo">
            <i className="ri-building-line"></i>
          </div>
          <div>
            <h3 className="job-card-title">{job.title}</h3>
            <p className="job-card-company">{job.companyName}</p>
          </div>
        </div>
        <div>
          <p className="job-card-date">{job.applicationDeadline}</p>
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
            {job.salaryRange}
          </span>
        </div>
      </div>

      <p className="job-card-description">{job.jobDescription}</p>

      <div className="job-card-additional">
        <p className="job-card-info">
          <strong>Requirements:</strong> {job.requirements}
        </p>
        <p className="job-card-info">
          <strong>Benefits:</strong> {job.benefits}
        </p>
      </div>

      <div className="job-card-actions">
        <button className="job-card-apply">Apply Now</button>
        <button className="job-card-favorite">
          <i className="ri-heart-line"></i>
        </button>
      </div>
    </div>
  );
};
export default JobCard;
