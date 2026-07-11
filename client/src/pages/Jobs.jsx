import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

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

            const params = {};

            if (keyword) params.keyword = keyword;
            if (location) params.location = location;
            if (jobType) params.jobType = jobType;

            const res = await API.get("/jobs", {
                params
            });

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

    return (

        <MainLayout>

            <h2 className="mb-4">
                Available Jobs
            </h2>

            <div className="card p-3 shadow-sm mb-4">

                <div className="row">

                    <div className="col-md-4 mb-2">

                        <input
                            className="form-control"
                            placeholder="Search..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <input
                            className="form-control"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3 mb-2">

                        <select
                            className="form-select"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >

                            <option value="">
                                All Types
                            </option>

                            <option>
                                Full-Time
                            </option>

                            <option>
                                Part-Time
                            </option>

                            <option>
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
                            className="btn btn-secondary"
                            onClick={clearFilters}
                        >
                            Clear
                        </button>

                    </div>

                </div>

            </div>

            {loading ? (

                <h4>Loading...</h4>

            ) : jobs.length === 0 ? (

                <h4>No Jobs Found</h4>

            ) : (

                <div className="row">

                    {jobs.map((job) => (

                        <div
                            className="col-md-6 mb-4"
                            key={job._id}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4>{job.title}</h4>

                                    <h6 className="text-muted">
                                        {job.company}
                                    </h6>

                                    <p>📍 {job.location}</p>

                                    <p>💰 ₹{job.salary}</p>

                                    <p>{job.description}</p>

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