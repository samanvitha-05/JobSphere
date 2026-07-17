import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const Applicants = () => {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {

        try {

            const res = await API.get(`/applications/job/${jobId}`);

            setApplications(res.data.applications);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (applicationId, status) => {

    console.log("Sending status:", status);

    try {

        const res = await API.put(
            `/applications/status/${applicationId}`,
            { status }
        );

        console.log("Response:", res.data);

        fetchApplicants();

    } catch (error) {

        console.log("Error:", error.response?.data);

    }

};

    return (

        <MainLayout>

            <h2 className="mb-4">
                Applicants
            </h2>

            {applications.length === 0 ? (

                <h4>No Applicants Yet</h4>

            ) : (

                <>

                    <input
                        className="form-control mb-4"
                        placeholder="Search Applicant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="row">

                        {applications
                            .filter((application) =>
                                application.student?.name
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((application) => (

                                <div
                                    key={application._id}
                                    className="col-md-6 mb-4"
                                >

                                    <div className="card shadow h-100">

                                        <div className="card-body">

                                            <h4>
                                                {application.student.name}
                                            </h4>

                                            <p>
                                                {application.student.email}
                                            </p>

                                            <p>
                                                {application.student.phone}
                                            </p>

                                            {application.student?.resume ? (
                                                <a
                                                href={`http://localhost:5000${application.student.resume}`}
        
                                                target="_blank"
        
                                                rel="noreferrer"
        
                                                className="btn btn-outline-primary btn-sm me-2"
                                                >
                                                    
                                                    📄 View Resume
                                                    
                                                    </a>
                                                ) : (
                                                
                                                <span className="badge bg-secondary">
                                                    
                                                    Resume Not Uploaded
                                                    
                                                    </span>
                                                
                                                )}

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

                                            <div className="mt-3">

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    disabled={
                                                        application.status === "Accepted"
                                                    }
                                                    onClick={() =>
                                                        updateStatus(
                                                            application._id,
                                                            "Accepted"
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    disabled={
                                                        application.status === "Rejected"
                                                    }
                                                    onClick={() =>
                                                        updateStatus(
                                                            application._id,
                                                            "Rejected"
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                    </div>

                </>

            )}

        </MainLayout>

    );

};

export default Applicants;
