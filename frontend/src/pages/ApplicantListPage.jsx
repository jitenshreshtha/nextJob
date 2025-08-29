import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function ApplicantsPage() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/job/${id}/applicantlist`,
          { withCredentials: true }
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  if (loading) return <div className="applicants-loading">Loading...</div>;
  if (applicants.length === 0) return <div className="no-applicants">No applicants yet.</div>;

  return (
    <div className="applicants-container">
      <h2>Applicants for Job</h2>
      <ul className="applicant-list">
        {applicants.map((applicant) => (
          <li key={applicant._id} className="applicant-card">
            <p><strong>Name:</strong> {applicant.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${applicant.email}`}>{applicant.email}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicantsPage;
