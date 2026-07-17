import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import "./Profile.css";

const Profile = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        skills: "",
        resume: ""
    });

    const [resume, setResume] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const res = await API.get("/profile");

            setProfile({
                name: res.data.user.name || "",
                email: res.data.user.email || "",
                phone: res.data.user.phone || "",
                bio: res.data.user.bio || "",
                skills: res.data.user.skills
                    ? res.data.user.skills.join(", ")
                    : "",
                resume: res.data.user.resume || ""
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", profile.name);
            formData.append("phone", profile.phone);
            formData.append("bio", profile.bio);

            profile.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill !== "")
                .forEach(skill => formData.append("skills", skill));

            if (resume) {

                formData.append("resume", resume);

            }

            await API.put("/profile", formData);

            toast.success("Profile Updated Successfully");

            fetchProfile();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <div
                className="container"
                style={{ maxWidth: "850px" }}
            >

                <div className="profile-header">

                    <div className="profile-avatar">

                        {profile.name
                            ? profile.name.charAt(0).toUpperCase()
                            : "U"}

                    </div>

                    <h2>{profile.name}</h2>

                    <p className="mb-0">
                        {profile.email}
                    </p>

                </div>

                <div className="card shadow profile-card">

                    <div className="card-body p-4">

                        <h3 className="mb-4">
                            Edit Profile
                        </h3>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={profile.email}
                                    disabled
                                />

                            </div>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Bio
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    placeholder="Tell recruiters about yourself"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Skills
                                </label>

                                <input
                                    className="form-control"
                                    name="skills"
                                    value={profile.skills}
                                    onChange={handleChange}
                                    placeholder="Java, React, Node.js"
                                />

                            </div>

                            <div className="skills-preview mb-3">

                                {profile.skills
                                    .split(",")
                                    .map(skill => skill.trim())
                                    .filter(skill => skill !== "")
                                    .map((skill, index) => (

                                        <span
                                            key={index}
                                            className="badge bg-primary me-2 mb-2"
                                        >
                                            {skill}
                                        </span>

                                    ))}

                            </div>

                            <div className="mb-3">

                                <label className="profile-label">
                                    Upload Resume (PDF)
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setResume(e.target.files[0])
                                    }
                                />

                            </div>

                            {profile.resume && (

                                <div className="mb-3">

                                    <a
                                        href={`http://localhost:5000${profile.resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-primary"
                                    >
                                        📄 View Current Resume
                                    </a>

                                </div>

                            )}

                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                            >
                                Update Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default Profile;