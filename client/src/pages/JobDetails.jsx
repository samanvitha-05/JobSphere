import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const JobDetails = () => {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {

        try {

            const res = await API.get(`/jobs/${id}`);

            setJob(res.data.job);

        } catch (error) {

            console.log(error);

        }

    };

    const applyJob = async () => {

        try {

            const res = await API.post(`/applications/apply/${id}`);

            toast.success(res.data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Application Failed"
            );

        }

    };

    if (!job) {

        return (

            <MainLayout>

                <h3>Loading...</h3>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <ToastContainer />

            <div className="card shadow p-4">

                <h2>{job.title}</h2>

                <h5 className="text-muted">

                    {job.company}

                </h5>

                <hr />

                <p>

                    <strong>Location:</strong> {job.location}

                </p>

                <p>

                    <strong>Salary:</strong> ₹{job.salary}

                </p>

                <p>

                    <strong>Experience:</strong> {job.experience}

                </p>

                <p>

                    <strong>Job Type:</strong> {job.jobType}

                </p>

                <p>

                    <strong>Description:</strong>

                </p>

                <p>{job.description}</p>

                <p>

                    <strong>Skills:</strong>

                </p>

                <ul>

                    {job.skills.map((skill, index) => (

                        <li key={index}>{skill}</li>

                    ))}

                </ul>

                <button
                    className="btn btn-success mt-3"
                    onClick={applyJob}
                >
                    Apply Now
                </button>

            </div>

        </MainLayout>

    );

};

export default JobDetails;