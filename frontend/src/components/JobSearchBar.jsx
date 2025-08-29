import React, { useState } from "react";
import "../styles/JobSearchBar.css"; 

const JobSearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search, location);
  };

  return (
    <div className="job-search-container">
      <form className="job-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title, keywords or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search Jobs</button>
      </form>
    </div>
  );
};

export default JobSearchBar;
