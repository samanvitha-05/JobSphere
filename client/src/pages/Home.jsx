import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import "./Home.css";

const Home = () => {

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
                            discover exciting opportunities, and build successful careers.
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
                            alt="Job Portal"
                            className="hero-image img-fluid"
                        />

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2>Why Choose JobSphere?</h2>

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
                                    Explore job opportunities from leading companies
                                    across India.
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
                                    Apply for jobs in just one click using your
                                    JobSphere profile.
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
                                    Connect with recruiters and grow your career
                                    with confidence.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="container py-5">

                <div className="row text-center">

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-primary fw-bold">
                                1000+
                            </h2>

                            <p className="mb-0">
                                Jobs Posted
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-success fw-bold">
                                500+
                            </h2>

                            <p className="mb-0">
                                Companies
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card stats-card shadow p-4">

                            <h2 className="text-danger fw-bold">
                                5000+
                            </h2>

                            <p className="mb-0">
                                Students
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </MainLayout>

    );

};

export default Home;