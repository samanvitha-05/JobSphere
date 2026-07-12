import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./StudentDashboard.css";

const StudentDashboard = () => {

    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        applications: 0,
        savedJobs: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const [applicationsRes, savedJobsRes] = await Promise.all([
                API.get("/applications/my"),
                API.get("/saved-jobs")
            ]);

            setStats({
                applications: applicationsRes.data.applications.length,
                savedJobs: savedJobsRes.data.jobs.length
            });

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
                    Manage your applications, saved jobs and profile from one place.
                </p>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>📄</h1>

                        <h5>Total Applications</h5>

                        <h2 className="text-primary">
                            {stats.applications}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>❤️</h1>

                        <h5>Saved Jobs</h5>

                        <h2 className="text-success">
                            {stats.savedJobs}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Available Jobs</h5>

                        <h2 className="text-warning">
                            100+
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
                            to="/jobs"
                            className="btn btn-primary quick-btn"
                        >
                            Browse Jobs
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/my-applications"
                            className="btn btn-success quick-btn"
                        >
                            My Applications
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/saved-jobs"
                            className="btn btn-warning quick-btn"
                        >
                            Saved Jobs
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/profile"
                            className="btn btn-dark quick-btn"
                        >
                            Edit Profile
                        </Link>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default StudentDashboard;