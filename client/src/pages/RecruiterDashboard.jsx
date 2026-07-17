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

    const [jobs, setJobs] = useState([]);
    const [recentApplicants, setRecentApplicants] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const [statsRes, jobsRes] = await Promise.all([
                API.get("/dashboard/recruiter"),
                API.get("/jobs/my-jobs")
            ]);

            setStats(statsRes.data.stats);

            setJobs(jobsRes.data.jobs);

            let applicants = [];

            for (const job of jobsRes.data.jobs) {

                const res = await API.get(
                    `/applications/job/${job._id}`
                );

                applicants.push(...res.data.applications);

            }

            setRecentApplicants(
                applicants.slice(0, 5)
            );

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

                <p>
                    Manage your jobs and recruit talented candidates.
                </p>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Jobs Posted</h5>

                        <h2 className="text-success">
                            {stats.jobs}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

                        <h1>📄</h1>

                        <h5>Total Applications</h5>

                        <h2 className="text-primary">
                            {stats.totalApplications}
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

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

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/post-job"
                            className="btn btn-success w-100"
                        >
                            Post Job
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/my-posted-jobs"
                            className="btn btn-primary w-100"
                        >
                            My Jobs
                        </Link>

                    </div>

                    <div className="col-md-2 mb-3">

                        <Link
                            to="/jobs"
                            className="btn btn-warning w-100"
                        >
                            Browse
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

            {/* Recent Jobs */}

            <div className="card shadow mt-5">

                <div className="card-header bg-success text-white">

                    <h4 className="mb-0">

                        Recent Posted Jobs

                    </h4>

                </div>

                <div className="card-body">

                    {jobs.length === 0 ? (

                        <p>No jobs posted.</p>

                    ) : (

                        jobs.slice(0, 5).map((job) => (

                            <div
                                key={job._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h5>{job.title}</h5>

                                <p>{job.company}</p>

                                <Link
                                    to={`/applicants/${job._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    View Applicants
                                </Link>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* Recent Applicants */}

            <div className="card shadow mt-5 mb-5">

                <div className="card-header bg-primary text-white">

                    <h4 className="mb-0">

                        Recent Applicants

                    </h4>

                </div>

                <div className="card-body">

                    {recentApplicants.length === 0 ? (

                        <p>No applicants yet.</p>

                    ) : (

                        recentApplicants.map((application) => (

                            <div
                                key={application._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h5>

                                    {application.student.name}

                                </h5>

                                <p>

                                    {application.job.title}

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

        </MainLayout>

    );

};

export default RecruiterDashboard;