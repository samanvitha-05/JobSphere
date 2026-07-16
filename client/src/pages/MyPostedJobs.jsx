import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import EmptyState from "../components/EmptyState";

const MyPostedJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {

        try {

            setLoading(true);

            const res = await API.get("/jobs/my-jobs");

            setJobs(res.data.jobs);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const deleteJob = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/jobs/${id}`);

            toast.success("Job deleted successfully!");

            fetchJobs();

        } catch (error) {

            console.log(error);

            toast.error("Failed to delete job");

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <h2 className="mb-4">
                My Posted Jobs
            </h2>

            {loading ? (

                <div className="text-center mt-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                    </div>
                </div>

            ) : jobs.length === 0 ? (

                <EmptyState
                    icon="💼"
                    title="No Jobs Posted"
                    message="Create your first job posting."
                    buttonText="Post Job"
                    buttonLink="/post-job"
                />

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

                                    <p>
                                        💰 ₹{Number(job.salary).toLocaleString()}
                                    </p>

                                    <p>
                                        <strong>Type:</strong> {job.jobType}
                                    </p>

                                    <p>
                                        <strong>Experience:</strong> {job.experience}
                                    </p>

                                    <div className="d-flex flex-wrap gap-2 mt-3">

                                        <Link
                                            to={`/jobs/${job._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/edit-job/${job._id}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteJob(job._id)}
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/applicants/${job._id}`}
                                            className="btn btn-success btn-sm"
                                        >
                                            Applicants
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </MainLayout>

    );

};

export default MyPostedJobs;