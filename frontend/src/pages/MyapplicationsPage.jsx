import React,{useState,useEffect} from 'react'
import axios from 'axios';

function MyapplicationsPage() {
    const [jobs,setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchAppliedJobs = async() =>{
            try {
                const response = await axios.get("http://localhost:5000/job/myApplications",{
                    withCredentials: true,
                });
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchAppliedJobs();
    },[])

if(loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Applications</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Status:</strong> Applied</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyapplicationsPage