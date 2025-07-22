import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/me", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        if(error.response?.status === 401){
            toast.error("User not logged in");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;
