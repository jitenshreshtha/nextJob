import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//file imports
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import FindJobsPage from "./pages/FindJobsPage";
import PostJobsPage from "./pages/PostJobsPage";
import MyJobspage from "./pages/MyJobspage";
import JobDetailsPage from "./pages/JobDetailsPage";
import MyapplicationsPage from "./pages/MyapplicationsPage";
import ApplicantListPage from "./pages/ApplicantListPage";

//import context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route
              path="/findJobs"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <FindJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myApplications"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <MyapplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/postJobs"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <PostJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myJobs"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <MyJobspage />
                </ProtectedRoute>
              }
            />
            <Route path="/job/:id/" element={<JobDetailsPage />} />
            <Route
              path="/job/:id/applicantlist"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <ApplicantListPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
