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
        savedJobs: 0,
        jobs: 0
    });

    const [recentApplications, setRecentApplications] = useState([]);
    const [latestJobs, setLatestJobs] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const [
                applicationsRes,
                savedJobsRes,
                jobsRes
            ] = await Promise.all([
                API.get("/applications/my"),
                API.get("/saved-jobs"),
                API.get("/jobs")
            ]);

            setStats({
                applications: applicationsRes.data.applications.length,
                savedJobs: savedJobsRes.data.jobs.length,
                jobs: jobsRes.data.jobs.length
            });

            setRecentApplications(
                applicationsRes.data.applications.slice(0, 5)
            );

            setLatestJobs(
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

                <p className="mb-0">
                    Manage your career journey from one place.
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

                        <div className="progress mt-3">

                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                    width: `${Math.min(stats.savedJobs * 10, 100)}%`
                                }}
                            >
                                {stats.savedJobs}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Available Jobs</h5>

                        <h2 className="text-warning">
                            {stats.jobs}
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

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/jobs"
                            className="btn btn-primary w-100"
                        >
                            Browse Jobs
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/my-applications"
                            className="btn btn-success w-100"
                        >
                            Applications
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/saved-jobs"
                            className="btn btn-warning w-100"
                        >
                            Saved Jobs
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/notifications"
                            className="btn btn-info w-100"
                        >
                            Notifications
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/profile"
                            className="btn btn-dark w-100"
                        >
                            Profile
                        </Link>

                    </div>

                </div>

            </div>

            {/* Recent Applications */}

            <div className="card shadow mt-5">

                <div className="card-header bg-primary text-white">

                    <h4 className="mb-0">
                        Recent Applications
                    </h4>

                </div>

                <div className="card-body">

                    {recentApplications.length === 0 ? (

                        <p>No applications yet.</p>

                    ) : (

                        recentApplications.map((application) => (

                            <div
                                key={application._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h5>{application.job.title}</h5>

                                <p className="mb-1">
                                    {application.job.company}
                                </p>

                                <span
                                    className={
                                        application.status === "Accepted"
                                            ? "badge bg-success"
                                            : application.status === "Rejected"
                                            ? "badge bg-danger"
                                            : "badge bg-warning text-dark"
                                    }
                                >
                                    {application.status}
                                </span>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* Latest Jobs */}

            <div className="card shadow mt-5 mb-5">

                <div className="card-header bg-success text-white">

                    <h4 className="mb-0">
                        Latest Jobs
                    </h4>

                </div>

                <div className="card-body">

                    {latestJobs.length === 0 ? (

                        <div className="text-center py-5">
                            <h3>📭 No Jobs Found</h3>
                            <p className="text-muted">
                                There are no jobs available right now.
                                </p>
                                </div>

                    ) : (

                        latestJobs.map((job) => (

                            <div
                                key={job._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h5>{job.title}</h5>

                                <p className="mb-1">
                                    {job.company}
                                </p>

                                <Link
                                    to={`/jobs/${job._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    View Job
                                </Link>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </MainLayout>

    );

};


export default StudentDashboard;