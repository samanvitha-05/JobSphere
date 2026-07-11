import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const res = await API.get("/applications/my");

            setApplications(res.data.applications);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                My Applications
            </h2>

            {applications.length === 0 ? (

                <h4>No Applications Yet</h4>

            ) : (

                <div className="row">

                    {applications.map((application) => (

                        <div
                            className="col-md-6 mb-4"
                            key={application._id}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4>{application.job.title}</h4>

                                    <h6>{application.job.company}</h6>

                                    <p>📍 {application.job.location}</p>

                                    <p>💰 ₹{application.job.salary}</p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {application.status}
                                    </p>

                                    <Link
                                        to={`/jobs/${application.job._id}`}
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

export default MyApplications;