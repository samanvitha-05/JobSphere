import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const PostJob = () => {

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        experience: "",
        description: "",
        skills: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/jobs/create", {
                ...job,
                salary: Number(job.salary),
                skills: job.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
            });

            toast.success("Job Posted Successfully!");

            setTimeout(() => {
                navigate("/my-posted-jobs");
            }, 1200);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to Post Job"
            );

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <div className="container" style={{ maxWidth: "800px" }}>

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        Post a New Job
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Company</label>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={job.company}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Salary (Yearly)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="salary"
                                value={job.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Job Type</label>
                            <select
                                className="form-select"
                                name="jobType"
                                value={job.jobType}
                                onChange={handleChange}
                            >
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Internship</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Experience</label>
                            <input
                                type="text"
                                className="form-control"
                                name="experience"
                                placeholder="Example: 2 Years"
                                value={job.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                rows="5"
                                className="form-control"
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label>Skills (comma separated)</label>
                            <input
                                className="form-control"
                                name="skills"
                                placeholder="Java, Spring Boot, React"
                                value={job.skills}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100"
                        >
                            Post Job
                        </button>

                    </form>

                </div>

            </div>

        </MainLayout>

    );

};

export default PostJob;