import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const Profile = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        skills: ""
    });

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
                    : ""
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

            await API.put("/profile", {
                ...profile,
                skills: profile.skills
                    .split(",")
                    .map(skill => skill.trim())
            });

            toast.success("Profile Updated Successfully");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Update Failed"
            );

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <div className="container" style={{ maxWidth: "700px" }}>

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        My Profile
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                className="form-control"
                                value={profile.email}
                                disabled
                            />

                        </div>

                        <div className="mb-3">

                            <label>Phone</label>

                            <input
                                className="form-control"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Bio</label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Skills</label>

                            <input
                                className="form-control"
                                name="skills"
                                value={profile.skills}
                                onChange={handleChange}
                                placeholder="Java, React, Node.js"
                            />

                        </div>

                        <button
                            className="btn btn-primary"
                        >
                            Update Profile
                        </button>

                    </form>

                </div>

            </div>

        </MainLayout>

    );

};

export default Profile;