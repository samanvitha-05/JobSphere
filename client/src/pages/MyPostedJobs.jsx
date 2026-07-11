import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const MyPostedJobs = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {

        try {

            const res = await API.get("/jobs");

            const user = JSON.parse(localStorage.getItem("user"));

            const recruiterJobs = res.data.jobs.filter(
                (job) => job.recruiter?._id === user.id
            );

            setJobs(recruiterJobs);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                My Posted Jobs
            </h2>

            {jobs.length === 0 ? (

                <h4>No Jobs Posted Yet</h4>

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

                                    <h6>{job.company}</h6>

                                    <p>📍 {job.location}</p>

                                    <p>₹ {job.salary}</p>

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="btn btn-primary"
                                    >
                                        View
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

export default MyPostedJobs;
