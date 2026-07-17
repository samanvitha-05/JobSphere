# JobSphere - Full Stack Job Portal

JobSphere is a full-stack job portal developed using the MERN Stack. It allows students to search and apply for jobs while recruiters can post jobs and manage applications. The project includes secure authentication, role-based access, resume upload, notifications, dashboards, and profile management.

---

## Features

### Student
- User Registration & Login
- JWT Authentication
- Browse Jobs
- Search Jobs
- Apply for Jobs
- Save Jobs
- View Application Status
- Upload Resume
- Update Profile
- Student Dashboard
- Notifications

### Recruiter
- Recruiter Registration & Login
- Post Jobs
- Edit Jobs
- Delete Jobs
- View Applicants
- Accept/Reject Applications
- Recruiter Dashboard

### Admin
- Admin Dashboard
- Platform Overview

---

## Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

### Database
- MongoDB Atlas
- Mongoose

---

## Folder Structure

```
JobSphere
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/samanvitha-05/JobSphere.git
```

### Install Backend

```bash
cd server
npm install
```

### Install Frontend

```bash
cd client
npm install
```

### Create .env

```
PORT=5000
MONGO_URI=Your MongoDB Atlas URI
JWT_SECRET=Your Secret Key
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

---

## Project Modules

- Authentication
- Student Module
- Recruiter Module
- Admin Module
- Job Management
- Applications
- Resume Upload
- Notifications
- Dashboards
- Profile Management

---

## Future Enhancements

- Email Notifications
- Interview Scheduling
- Company Profiles
- AI Resume Analysis
- AI Job Recommendation
- Chat between Recruiter and Student

---

## Author

**Samanvitha DS**

Information Science and Engineering

Nitte Meenakshi Institute of Technology

---

## License

This project is developed for educational purposes.