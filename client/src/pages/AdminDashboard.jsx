import { useContext } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/AuthContext";

import "./AdminDashboard.css";

const AdminDashboard = () => {

    const { user } = useContext(AuthContext);

    return (

        <MainLayout>

            {/* Header */}

            <div className="dashboard-header">

                <h2>
                    👋 Welcome, {user?.name}
                </h2>

                <p className="mb-0">
                    Manage JobSphere platform, users and jobs from one place.
                </p>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>👥</h1>

                        <h5>Total Users</h5>

                        <h2 className="text-primary">
                            Coming Soon
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>💼</h1>

                        <h5>Total Jobs</h5>

                        <h2 className="text-success">
                            Coming Soon
                        </h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card stat-card shadow text-center p-4">

                        <h1>📄</h1>

                        <h5>Total Applications</h5>

                        <h2 className="text-warning">
                            Coming Soon
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

                    <div className="col-md-3">

                        <Link
                            to="/jobs"
                            className="btn btn-primary quick-btn"
                        >
                            View Jobs
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <Link
                            to="/profile"
                            className="btn btn-success quick-btn"
                        >
                            Profile
                        </Link>

                    </div>

                    <div className="col-md-3">

                        <button
                            className="btn btn-warning quick-btn"
                            disabled
                        >
                            Manage Users
                        </button>

                    </div>

                    <div className="col-md-3">

                        <button
                            className="btn btn-danger quick-btn"
                            disabled
                        >
                            Platform Settings
                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default AdminDashboard;