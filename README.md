# 🚔 Online Police Complaint Management System

## Overview

The Online Police Complaint Management System is a web-based application developed to simplify the process of registering and tracking police complaints online. The system allows citizens to submit complaints digitally, check complaint status using a unique complaint ID, and participate in public awareness events organized by the police department. The application provides a secure, transparent, and user-friendly platform that reduces manual paperwork and improves communication between citizens and law enforcement agencies.

## Features

* Online complaint registration
* Unique complaint ID generation
* Complaint status tracking
* Complaint history management
* Event registration system
* Mobile number and email validation
* Real-time character count and form validation
* Responsive user interface using Bootstrap
* MySQL database integration
* Node.js and Express backend services

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* jQuery
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MySQL

## Project Modules

### Complaint Registration

Citizens can submit complaints by entering personal details, district information, and complaint descriptions. A unique complaint ID is generated automatically for future tracking.

### Complaint Status Tracking

Users can enter their complaint ID to check the current investigation status of their complaint.

### Complaint History

All registered complaints are stored and displayed for administrative reference.

### Event Management

The system allows citizens to register for awareness programs such as Cyber Safety Workshops and Traffic Awareness Programs.

## Installation

1. Install dependencies

```bash
npm install
```

4. Create MySQL database

```sql
CREATE DATABASE eventdb;
```

5. Update MySQL credentials in server.js

```javascript
host: "localhost",
user: "root",
password: "your_password",
database: "eventdb"
```

6. Start the server

```bash
node server.js
```

7. Open in browser

```text
http://localhost:3000
```

## Future Enhancements

* User authentication and login
* OTP verification
* Complaint document upload
* Email and SMS notifications
* Admin dashboard
* Role-based access control
* Complaint analytics and reporting

## Learning Outcomes

This project demonstrates full-stack web development concepts including frontend design, backend API development, database integration, form validation, CRUD operations, and client-server communication.

