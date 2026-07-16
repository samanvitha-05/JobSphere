import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import EmptyState from "../components/EmptyState";

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

                <EmptyState
                    icon="📄"
                    title="No Applications Yet"
                    message="Apply for jobs to track your applications."
                    buttonText="Browse Jobs"
                    buttonLink="/jobs"
                />

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

                                    <p>💰 ₹ {application.job.salary}</p>

                                    <p>
                                        
                                        <strong>Status:</strong>{" "}
                                        
                                        <span
                                        
                                        className={
    
                                            application.status === "Accepted"
                
                                            ? "badge bg-success"
                
                                            : application.status === "Rejected"
                
                                            ? "badge bg-danger"
                
                                            : "badge bg-warning text-dark"

                                        }
                                        
                                        >
                                            
                                            {application.status}
                                            
                                            </span>
                                            
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