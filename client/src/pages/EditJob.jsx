import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const EditJob = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        experience: "",
        description: "",
        skills: ""
    });

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {

        try {

            const res = await API.get(`/jobs/${id}`);

            setJob({
                ...res.data.job,
                skills: res.data.job.skills.join(", ")
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/jobs/${id}`, {
                ...job,
                skills: job.skills
                    .split(",")
                    .map(skill => skill.trim())
            });

            alert("Job Updated Successfully");

            navigate("/my-posted-jobs");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container" style={{ maxWidth: "700px" }}>

                <div className="card shadow p-4">

                    <h2>Edit Job</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />

                        <input
                            className="form-control mb-3"
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            placeholder="Company"
                        />

                        <input
                            className="form-control mb-3"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />

                        <input
                            className="form-control mb-3"
                            name="salary"
                            value={job.salary}
                            onChange={handleChange}
                            placeholder="Salary"
                        />

                        <input
                            className="form-control mb-3"
                            name="jobType"
                            value={job.jobType}
                            onChange={handleChange}
                            placeholder="Job Type"
                        />

                        <input
                            className="form-control mb-3"
                            name="experience"
                            value={job.experience}
                            onChange={handleChange}
                            placeholder="Experience"
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="4"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            name="skills"
                            value={job.skills}
                            onChange={handleChange}
                        />

                        <button className="btn btn-primary">
                            Update Job
                        </button>

                    </form>

                </div>

            </div>

        </MainLayout>

    );

};

export default EditJob;