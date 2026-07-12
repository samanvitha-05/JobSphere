import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import "./Jobs.css";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {

        try {

            setLoading(true);

            const params = {};

            if (keyword) params.keyword = keyword;
            if (location) params.location = location;
            if (jobType) params.jobType = jobType;

            const res = await API.get("/jobs", {
                params
            });

            console.log("API Response:", res.data);
            setJobs(res.data.jobs);


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const clearFilters = () => {

        setKeyword("");
        setLocation("");
        setJobType("");

        setTimeout(fetchJobs, 100);

    };

    const formatSalary = (salary) => {

        if (!salary) return "Not Disclosed";

        return `₹ ${(salary / 100000).toFixed(1)} LPA`;

    };

    return (

        <MainLayout>

            <h2 className="mb-4 fw-bold text-primary">
                Available Jobs
            </h2>

            {/* Search & Filters */}

            <div className="card shadow p-4 mb-5">

                <div className="row">

                    <div className="col-md-4 mb-2">

                        <input
                            className="form-control search-box"
                            placeholder="Search by title..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <input
                            className="form-control filter-box"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <select
                            className="form-select filter-box"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >

                            <option value="">
                                All Types
                            </option>

                            <option value="Full-Time">
                                Full-Time
                            </option>

                            <option value="Part-Time">
                                Part-Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                        </select>

                    </div>

                    <div className="col-md-2 d-grid">

                        <button
                            className="btn btn-primary mb-2"
                            onClick={fetchJobs}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={clearFilters}
                        >
                            Clear
                        </button>

                    </div>

                </div>

            </div>

            {loading ? (

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                    </div>

                    <p className="mt-3">
                        Loading Jobs...
                    </p>

                </div>

            ) : jobs.length === 0 ? (

                <div className="text-center py-5">

                    <h2>📭</h2>

                    <h4>No Jobs Found</h4>

                    <p className="text-muted">
                        Try searching with different keywords.
                    </p>

                </div>

            ) : (

                <div className="row">

                    {jobs.map((job) => (

                        <div
                            className="col-lg-6 mb-4"
                            key={job._id}
                        >

                            <div className="card job-card shadow h-100">

                                <div className="card-body">

                                    <h3 className="job-title">
                                        💼 {job.title}
                                    </h3>

                                    <h5 className="job-company">
                                        🏢 {job.company}
                                    </h5>

                                    <p className="job-info">
                                        📍 {job.location}
                                    </p>

                                    <p className="job-info">
                                        💰 {formatSalary(job.salary)}
                                    </p>

                                    <span className="badge bg-primary mb-3">
                                        {job.jobType}
                                    </span>

                                    <p>
                                        {job.description}
                                    </p>

                                    <div className="mb-3">

                                        {job.skills?.map((skill, index) => (

                                            <span
                                                key={index}
                                                className="badge bg-secondary skill-badge"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                    </div>

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="btn btn-primary"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </MainLayout>

    );

};

export default Jobs;