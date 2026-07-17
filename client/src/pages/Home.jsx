import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import hero from "../assets/hero.png";
import "./Home.css";

const Home = () => {

    const [featuredJobs, setFeaturedJobs] = useState([]);

    const [stats, setStats] = useState({
        totalJobs: 0,
        students: 500,
        recruiters: 100
    });

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {

        try {

            const res = await API.get("/jobs");

            setFeaturedJobs(res.data.jobs.slice(0, 6));

            setStats({
                totalJobs: res.data.jobs.length,
                students: 500,
                recruiters: 100
            });

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            {/* Hero Section */}

            <section className="hero-section">

                <div className="row align-items-center">

                    <div className="col-lg-6">

                        <h1 className="hero-title">
                            Find Your Dream Job Today
                        </h1>

                        <p className="hero-subtitle">
                            JobSphere helps students connect with top companies,
                            discover exciting opportunities and build successful careers.
                        </p>

                        <Link
                            to="/jobs"
                            className="btn btn-light btn-lg me-3"
                        >
                            Browse Jobs
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-outline-light btn-lg"
                        >
                            Get Started
                        </Link>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src={hero}
                            alt="Hero"
                            className="hero-image img-fluid"
                        />

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2>
                        Why Choose JobSphere?
                    </h2>

                    <p className="text-muted">
                        Everything you need to launch your career.
                    </p>

                </div>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <div className="card feature-card shadow h-100">

                            <div className="card-body text-center">

                                <h1>💼</h1>

                                <h4>Thousands of Jobs</h4>

                                <p>
                                    Explore opportunities from leading companies across India.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card feature-card shadow h-100">

                            <div className="card-body text-center">

                                <h1>⚡</h1>

                                <h4>Easy Apply</h4>

                                <p>
                                    Apply for jobs in just one click using your JobSphere profile.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card feature-card shadow h-100">

                            <div className="card-body text-center">

                                <h1>🚀</h1>

                                <h4>Career Growth</h4>

                                <p>
                                    Connect with recruiters and grow your career confidently.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2>
                        Platform Statistics
                    </h2>

                </div>

                <div className="row text-center">

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-primary fw-bold">
                                {stats.totalJobs}
                            </h2>

                            <p className="mb-0">
                                Total Jobs
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-success fw-bold">
                                {stats.recruiters}+
                            </h2>

                            <p className="mb-0">
                                Recruiters
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-danger fw-bold">
                                {stats.students}+
                            </h2>

                            <p className="mb-0">
                                Students
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Featured Jobs */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2>
                        Featured Jobs
                    </h2>

                    <p className="text-muted">
                        Explore the latest opportunities.
                    </p>

                </div>

                <div className="row">

                    {featuredJobs.map((job) => (

                        <div
                            className="col-md-4 mb-4"
                            key={job._id}
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4>{job.title}</h4>

                                    <h6>{job.company}</h6>

                                    <p>📍 {job.location}</p>

                                    <p>💰 ₹ {job.salary}</p>

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="btn btn-primary"
                                    >
                                        View Job
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* Call To Action */}

            <section className="bg-dark text-white py-5 mt-5">

                <div className="container text-center">

                    <h2>
                        Ready to Start Your Career?
                    </h2>

                    <p className="mb-4">
                        Join thousands of students and recruiters using JobSphere.
                    </p>

                    <Link
                        to="/register"
                        className="btn btn-warning btn-lg"
                    >
                        Create Account
                    </Link>

                </div>

            </section>

        </MainLayout>

    );

};

export default Home;