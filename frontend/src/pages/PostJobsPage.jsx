import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PostJobPage.css"; 

function PostJobsPage() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "full-time",
    salaryRange: "",
    jobDescription: "",
    requirements: "",
    benefits: "",
    contactEmail: "",
    applicationDeadline: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/job/addJob",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Job posted successfully");
        setFormData({
          title: "",
          companyName: "",
          location: "",
          jobType: "full-time",
          salaryRange: "",
          jobDescription: "",
          requirements: "",
          benefits: "",
          contactEmail: "",
          applicationDeadline: "",
        });
      }
    } catch (error) {
      toast.error("Failed to post job");
    }
  };
  const handleReset = () => {
    setFormData({
      title: "",
      companyName: "",
      location: "",
      jobType: "full-time",
      salaryRange: "",
      jobDescription: "",
      requirements: "",
      benefits: "",
      contactEmail: "",
      applicationDeadline: "",
    });
  };
  return (
    <div className="post-job-container">
      <main className="post-job-main">
        <div className="post-job-card">
          <div className="post-job-header">
            <h1 className="post-job-title">Post a Job</h1>
            <p className="post-job-subtitle">Find the perfect candidate for your team</p>
          </div>

          <form onSubmit={handleSubmit} className="post-job-form">
            <div className="post-job-grid">
              <div>
                <label className="post-job-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="post-job-input"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              <div>
                <label className="post-job-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="post-job-input"
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>

            <div className="post-job-grid">
              <div>
                <label className="post-job-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="post-job-input"
                  placeholder="e.g. New York, NY"
                  required
                />
              </div>

              <div>
                <label className="post-job-label">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="post-job-select"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label className="post-job-label">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className="post-job-input"
                placeholder="e.g. $60,000 - $80,000"
                required
              />
            </div>

            <div>
              <label className="post-job-label">Job Description</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={6}
                maxLength={500}
                className="post-job-textarea"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                required
              />
              <p className="post-job-char-count">{formData.jobDescription.length}/500 characters</p>
            </div>

            <div>
              <label className="post-job-label">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className="post-job-textarea"
                placeholder="List the required skills, experience, and qualifications..."
                required
              />
              <p className="post-job-char-count">{formData.requirements.length}/500 characters</p>
            </div>

            <div>
              <label className="post-job-label">Benefits & Perks</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                className="post-job-textarea"
                placeholder="Health insurance, flexible hours, remote work options..."
              />
              <p className="post-job-char-count">{formData.benefits.length}/500 characters</p>
            </div>

            <div>
              <label className="post-job-label">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="post-job-input"
                placeholder="hiring@company.com"
                required
              />
            </div>

            <div>
              <label className="post-job-label">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="post-job-input"
              />
            </div>

            <div className="post-job-button-container">
              <button type="submit" className="post-job-button">
                Post Job
              </button>
              <button 
                type="reset" 
                className="post-job-button post-job-button-reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PostJobsPage;
