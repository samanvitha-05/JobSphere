import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./AdminDashboard.css";

const AdminDashboard = () => {

    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalRecruiters: 0,
        totalJobs: 0,
        totalApplications: 0
    });

    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const [dashboardRes, jobsRes] = await Promise.all([
                API.get("/dashboard"),
                API.get("/jobs")
            ]);

            setStats(dashboardRes.data.stats);

            setRecentJobs(
                jobsRes.data.jobs.slice(0, 5)
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="dashboard-header">

                <h2>
                    👋 Welcome, {user?.name}
                </h2>

                <p>
                    Manage the JobSphere platform from one place.
                </p>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>🎓</h1>

                        <h5>Students</h5>

                        <h2 className="text-primary">

                            {stats.totalStudents}

                        </h2>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>🏢</h1>

                        <h5>Recruiters</h5>

                        <h2 className="text-success">

                            {stats.totalRecruiters}

                        </h2>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Total Jobs</h5>

                        <h2 className="text-warning">

                            {stats.totalJobs}

                        </h2>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>📄</h1>

                        <h5>Applications</h5>

                        <h2 className="text-danger">

                            {stats.totalApplications}

                        </h2>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow p-4 mt-4">

                <h4 className="mb-4">

                    Admin Actions

                </h4>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <Link
                            to="/jobs"
                            className="btn btn-primary w-100"
                        >
                            View Jobs
                        </Link>

                    </div>

                    <div className="col-md-3 mb-3">

                        <Link
                            to="/notifications"
                            className="btn btn-info w-100"
                        >
                            Notifications
                        </Link>

                    </div>

                    <div className="col-md-3 mb-3">

                        <Link
                            to="/profile"
                            className="btn btn-success w-100"
                        >
                            Profile
                        </Link>

                    </div>

                    <div className="col-md-3 mb-3">

                        <button
                            className="btn btn-dark w-100"
                            disabled
                        >
                            Settings
                        </button>

                    </div>

                </div>

            </div>

            {/* Recent Jobs */}

            <div className="card shadow mt-5">

                <div className="card-header bg-primary text-white">

                    <h4 className="mb-0">

                        Recent Jobs

                    </h4>

                </div>

                <div className="card-body">

                    {recentJobs.length === 0 ? (

                        <p>No jobs available.</p>

                    ) : (

                        recentJobs.map((job) => (

                            <div
                                key={job._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h5>

                                    {job.title}

                                </h5>

                                <p>

                                    {job.company}

                                </p>

                                <Link
                                    to={`/jobs/${job._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    View
                                </Link>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </MainLayout>

    );

};

export default AdminDashboard;