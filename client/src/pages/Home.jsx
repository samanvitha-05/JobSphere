import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const Home = () => {
    return (
        <MainLayout>

            {/* Hero Section */}
            <div className="py-5 text-center">

                <h1 className="display-3 fw-bold">
                    Find Your Dream Job
                </h1>

                <p className="lead mt-3">
                    Search thousands of jobs from top companies across India.
                </p>

                <div className="mt-4">

                    <Link
                        to="/jobs"
                        className="btn btn-primary btn-lg me-3"
                    >
                        Browse Jobs
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-outline-dark btn-lg"
                    >
                        Get Started
                    </Link>

                </div>

                <div className="text-center mt-5">

                    <img
                        src={hero}
                        alt="Job Portal"
                        className="img-fluid"
                        style={{ maxWidth: "650px" }}
                    />

                </div>

            </div>

            {/* Features Section */}
            <div className="row text-center mt-5 mb-5">

                <div className="col-md-4">

                    <h3>💼 Thousands of Jobs</h3>

                    <p>
                        Explore thousands of jobs from top companies across India.
                    </p>

                </div>

                <div className="col-md-4">

                    <h3>⚡ Easy Apply</h3>

                    <p>
                        Apply for your dream job with just one click.
                    </p>

                </div>

                <div className="col-md-4">

                    <h3>🚀 Career Growth</h3>

                    <p>
                        Build your career with trusted recruiters and exciting opportunities.
                    </p>

                </div>

            </div>

            {/* Statistics Section */}
            <section className="py-5">

                <div className="row text-center">

                    <div className="col-md-4 mb-4">

                        <h2 className="text-primary fw-bold">
                            1000+
                        </h2>

                        <p>Jobs Posted</p>

                    </div>

                    <div className="col-md-4 mb-4">

                        <h2 className="text-success fw-bold">
                            500+
                        </h2>

                        <p>Companies</p>

                    </div>

                    <div className="col-md-4 mb-4">

                        <h2 className="text-danger fw-bold">
                            5000+
                        </h2>

                        <p>Students</p>

                    </div>

                </div>

            </section>

        </MainLayout>
    );
};

export default Home;