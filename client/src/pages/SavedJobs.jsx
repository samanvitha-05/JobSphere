import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const SavedJobs = () => {

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {

        try {

            const res = await API.get("/saved-jobs");

            setSavedJobs(res.data.jobs);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                Saved Jobs
            </h2>

            {savedJobs.length === 0 ? (

                <h4>No Saved Jobs</h4>

            ) : (

                <div className="row">

                    {savedJobs.map((item) => (

                        <div
                            className="col-md-6 mb-4"
                            key={item._id}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4>{item.job.title}</h4>

                                    <h6>{item.job.company}</h6>

                                    <p>📍 {item.job.location}</p>

                                    <p>💰 ₹{item.job.salary}</p>

                                    <Link
                                        to={`/jobs/${item.job._id}`}
                                        className="btn btn-primary"
                                    >
                                        View Job
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

export default SavedJobs;