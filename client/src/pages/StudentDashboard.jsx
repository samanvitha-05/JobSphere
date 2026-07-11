import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const StudentDashboard = () => {

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

            <h2 className="mb-4">
                Student Dashboard
            </h2>

            <div className="row">

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Applications</h5>

                        <h2 className="text-primary">
                            {stats.applications}
                        </h2>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Saved Jobs</h5>

                        <h2 className="text-success">
                            {stats.savedJobs}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="mt-4">

                <Link
                    to="/my-applications"
                    className="btn btn-primary me-3"
                >
                    My Applications
                </Link>

                <Link
                    to="/saved-jobs"
                    className="btn btn-warning"
                >
                    Saved Jobs
                </Link>

            </div>

        </MainLayout>

    );

};

export default StudentDashboard;