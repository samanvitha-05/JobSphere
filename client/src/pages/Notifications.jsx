import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import EmptyState from "../components/EmptyState";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {

        try {

            const res = await API.get("/notifications");

            setNotifications(res.data.notifications);

        } catch (error) {

            console.log(error);

        }

    };

    const markAsRead = async (id) => {

    try {

        await API.put(`/notifications/${id}`);

        fetchNotifications();

    } catch (error) {

        console.log(error);

    }

};

    return (

        <MainLayout>

            <div className="container">

                <h2 className="mb-4">
                    Notifications
                </h2>

                {notifications.length === 0 ? (

                    <EmptyState
                        icon="🔔"
                        title="No Notifications"
                        message="You don't have any notifications yet."
                    />

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification._id}
                            className={`card shadow-sm mb-3 ${
                                notification.read
                                    ? ""
                                    : "border-primary"
                            }`}
                        >

                            <div className="card-body">

                                <h5>
                                    {notification.title}
                                </h5>

                                <p className="mb-2">
                                    {notification.message}
                                </p>

                                <small className="text-muted">

                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}

                                </small>

                                {!notification.read && (

                                    <div className="mt-3">

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                markAsRead(notification._id)
                                            }
                                        >
                                            Mark as Read
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>

        </MainLayout>

    );

};

export default Notifications;