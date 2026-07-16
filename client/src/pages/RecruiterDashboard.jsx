import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./RecruiterDashboard.css";

const RecruiterDashboard = () => {

    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        jobs: 0,
        totalApplications: 0,
        activeJobs: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

    try {

        const res = await API.get("/dashboard/recruiter");

        setStats(res.data.stats);

    } catch (error) {

        console.log(error);

    }
  };

    return (

        <MainLayout>

            {/* Header */}

            <div className="dashboard-header">

                <h2>
                    👋 Welcome, {user?.name}
                </h2>

                <p className="mb-0">
                    Manage your job postings and recruit talented candidates.
                </p>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Jobs Posted</h5>

                        <h2 className="text-success">
                            {stats.jobs}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>📄</h1>

                        <h5>Total Applications</h5>

                        <h2 className="text-primary">
                          
                          {stats.totalApplications}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>🟢</h1>

                        <h5>Active Jobs</h5>

                        <h2 className="text-warning">
                            {stats.activeJobs}
                        </h2>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow p-4 mt-4">

                <h4 className="mb-4">
                    Quick Actions
                </h4>

                <div className="row">

                    <div className="col-md-3">

                        <Link
                            to="/post-job"
                            className="btn btn-success quick-btn"
                        >
                            Post New Job
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/my-posted-jobs"
                            className="btn btn-primary quick-btn"
                        >
                            My Jobs
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/jobs"
                            className="btn btn-warning quick-btn"
                        >
                            Browse Jobs
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/profile"
                            className="btn btn-dark quick-btn"
                        >
                            Profile
                        </Link>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default RecruiterDashboard;