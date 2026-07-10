import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {

        try {

            const res = await API.get("/jobs");
            console.log(res.data);

            setJobs(res.data.jobs);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <MainLayout>

            <h2 className="mb-4">Available Jobs</h2>

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

                                    <p>
                                        📍 {job.location}
                                    </p>

                                    <p>
                                        💰 ₹{job.salary}
                                    </p>

                                    <p>
                                        {job.description}
                                    </p>

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