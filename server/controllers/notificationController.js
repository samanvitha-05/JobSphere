const Notification = require("../models/Notification");

// Create Notification
const createNotification = async (req, res) => {
    try {

        const notification = await Notification.create({
            user: req.user.id,
            title: req.body.title,
            message: req.body.message
        });

        res.status(201).json({
            success: true,
            notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get My Notifications
const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Mark as Read
const markAsRead = async (req, res) => {
    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            notification
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Notification
const deleteNotification = async (req, res) => {
    try {

        await Notification.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification
};