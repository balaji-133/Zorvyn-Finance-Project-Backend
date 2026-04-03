# 🚀 Zorvyn Finance Dashboard API

A professional Node.js / Express RESTful API for financial record management with strict role-based access control and comprehensive dashboard analytics.

---

## 🔐 Quick Credentials & Access
Use these interactive tools to explore the live API documentation:

**Interactive Admin & API Documentation (Swagger)**
- **URL:** `http://localhost:5000/api-docs/` *(When running locally)*
- **Permissions:** Test all endpoints, view schemas, and manage records interactively.

*(Note: Create users via the `/api/auth/register` endpoint to test Viewer, Analyst, and Admin roles).*

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Live Deployment](#-live-deployment)
3. [Features](#-features)
4. [Technology Stack](#️-technology-stack)
5. [Local Setup](#-local-setup)
6. [API Endpoints Reference](#-complete-api-endpoints-reference)
7. [Access Control Matrix](#-access-control)
8. [Testing](#-testing)
9. [Deployment](#-deployment)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview
Zorvyn Finance Dashboard Backend is a complete, lightweight, and high-performance solution for managing financial records:

- **User Management:** Admin, Analyst, and Viewer roles defining specific permission boundaries.
- **Financial Records:** Full CRUD capabilities with robust MongoDB aggregation and filtering.
- **Analytics:** Dashboard summaries, category-wise breakdowns, and monthly trends.
- **Access Control:** Enforced securely via JWT authentication at both the route and document level.
- **Data Validation:** Strict input validation utilizing `express-validator`.
- **Persistent Storage:** MongoDB database integration for scalable cloud storage.

---

## 🚀 Live Deployment

**Status: ✅ FUNCTIONAL & OPTIMIZED**

- **API Base URL:** *(To be deployed on Render/Vercel/Heroku)*
- **Interactive API Docs:** `[YOUR_DOMAIN]/api-docs/`

All endpoints are fully validated, secured against XSS/CSP vulnerabilities, and ready for production.

---

## ✨ Features

### 1. User & Role Management
- ✅ Three predefined roles (Viewer, Analyst, Admin)
- ✅ User status management (Active, Inactive)
- ✅ Secure Bcrypt password hashing
- ✅ JWT (JSON Web Token) authentication for secure API access

### 2. Financial Records Management
- ✅ Create, read, update, delete operations
- ✅ Income and expense record types
- ✅ Extensive financial categories support
- ✅ Date-based and category-based query filtering
- ✅ Soft delete functionality built into the MongoDB Schema
- ✅ Dynamic pagination and targeted sorting

### 3. Dashboard Analytics
- ✅ Overall financial summary (Income, expenses, net balance)
- ✅ Category-wise financial breakdowns
- ✅ Monthly trends mapping
- ✅ Recent activity transaction feed

### 4. Access Control
- ✅ Role-based permissions at the endpoint level
- ✅ Object-level permissions for record editing (Analysts only edit their own)
- ✅ Admin full-override capabilities for structural management

### 5. Additional Features
- ✅ Full-text search and filtering across records
- ✅ Centralized global error handling
- ✅ Interactive Swagger Open-API documentation
- ✅ Hardened security headers using `Helmet` and CORS enforcement

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Node.js with Express (5.x) |
| **Database** | MongoDB (via Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) & Bcryptjs |
| **Validation** | Express-Validator |
| **Security** | Helmet, CORS, Express-Rate-Limit |
| **Documentation**| Swagger UI Express & Swagger-JSDoc |

---

## 💻 Local Setup

### Prerequisites
- Node.js (v16 or higher)
- Git & npm (Node Package Manager)
- Local MongoDB instance OR MongoDB Atlas cluster URI

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/balaji-133/Zorvyn-Finance-Project-Backend.git
cd finance-data-backend
```

**2. Install Dependencies**
```bash
npm install
```

**3. Configure Environment**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance_db # Or your Atlas URI
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=24h
NODE_ENV=development
```

**4. Start Development Server**
```bash
npm run dev
```
Server will run immediately at: `http://localhost:5000`

---

## 🔌 Complete API Endpoints Reference

### 🔐 Authentication

**Register New User**
`POST /api/auth/register`
*Body:*
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Login & Get Token**
`POST /api/auth/login`
*Body:*
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```
*Usage: Include the returned token in all future requests as `Authorization: Bearer <token>`.*

**Get Current User Profile**
`GET /api/auth/me` *(Requires Token)*

### 👥 User Management Endpoints (Admin Only)

**List All Users**
`GET /api/users/`

**Update User Role/Status**
`PUT /api/users/:id`
*Body:*
```json
{
  "role": "Analyst",
  "status": "Active"
}
```

**Delete User**
`DELETE /api/users/:id`

### 💰 Financial Records Endpoints

**List All Records**
`GET /api/records/`
*Query Parameters (Optional):*
- `search=text` (Search description)
- `type=income|expense`
- `page=1`, `limit=20`

**Create New Record** *(Analyst/Admin)*
`POST /api/records/`
*Body:*
```json
{
  "type": "income",
  "category": "salary",
  "amount": 5000,
  "description": "Monthly salary",
  "date": "2026-04-03"
}
```

**Update Record** *(Owner/Admin)*
`PUT /api/records/:id`
*Body: (Requires all fields based on validation)*
```json
{
  "type": "income",
  "category": "salary",
  "amount": 5500,
  "description": "Updated salary amount"
}
```

**Delete Record** *(Admin)*
`DELETE /api/records/:id`

### 📊 Analytics & Dashboard Endpoints

**Get Overall Dashboard Summary**
`GET /api/summary/`
*Returns comprehensive aggregation of totals, categories, and monthly trends.*

---

## 🔐 Access Control Matrix

| Action | Viewer | Analyst | Admin |
| :--- | :---: | :---: | :---: |
| **View Records** | ✅ All | ✅ All | ✅ All |
| **Create Records** | ❌ | ✅ | ✅ |
| **Edit Own Records**| ❌ | ✅ | ✅ |
| **Edit Any Records**| ❌ | ❌ | ✅ |
| **Delete Records** | ❌ | ❌ | ✅ |
| **View Analytics** | ✅ | ✅ | ✅ |
| **Manage Users** | ❌ | ❌ | ✅ |

---

## 🧪 Testing (cURL Examples)

**1. Login to get token:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "SecurePassword123!"}'
```

**2. Access Dashboard Analytics:**
```bash
curl -X GET http://localhost:5000/api/summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Project Structure

```text
finance-data-backend/
├── src/                          
│   ├── config/              # Database connection logic
│   ├── controllers/         # Express endpoint handlers
│   ├── middleware/          # JWT protection and validators
│   ├── models/              # Mongoose database schemas
│   ├── routes/              # Express API routing definitions
│   ├── services/            # Deep business logic (Aggregations)
│   └── app.js               # Main Express application configuration
├── server.js                # Entry point
├── package.json             # NPM dependencies
└── .env                     # Environment variables
```

---

## 📝 API Response Examples

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "type": "income",
    "category": "salary",
    "amount": 5000,
    "description": "Monthly Salary",
    "_id": "60d5ec49c...",
    "createdAt": "2026-04-03T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request)**
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

---

## 🐛 Troubleshooting

- **MongoDB Connection Error (`ECONNREFUSED`):**
  Ensure your local MongoDB instance is running, or verify that your Atlas `MONGODB_URI` string in `.env` is correct.

- **"Not Authorized" / Token Errors:**
  Ensure you have logged in via `/api/auth/login` and are including the `Bearer YOUR_TOKEN` in the `Authorization` header.

- **Validation Errors (e.g. `Name is required`):**
  Ensure your JSON body strictly matches the schema. Double-check nested property capitalizations.

---

### ✉️ Support
For issues or questions, please open an issue in the GitHub repository.

**Created: April 4, 2026**
**Status: Production Ready**
**Version: 1.0**
