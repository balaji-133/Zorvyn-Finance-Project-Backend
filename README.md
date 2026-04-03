# 🚀 Finance Data Backend - Zorvyn Project

Status: ✅ LIVE AND OPTIMIZED

API Base URL: `https://zrovyn-finance-backend.onrender.com` (Example)

Admin Panel: Available via integrated Swagger UI at `/api-docs/`

All endpoints are fully functional, tested, and high-performance.

## ✨ Features

### 1. User & Role Management
- ✅ Three predefined roles: **Viewer**, **Analyst**, **Admin**
- ✅ User status management (active, inactive, suspended)
- ✅ JWT-based authentication for secure API access
- ✅ Secure password hashing with bcryptjs

### 2. Financial Records Management
- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Record Types**: Income and Expense
- ✅ **Categories**: 10+ financial categories (salary, food, transport, etc.)
- ✅ **Soft Delete**: Records are marked as deleted rather than permanently removed
- ✅ **Advanced Filtering**: Date-based, category-based, and type-based filtering

### 3. Dashboard Analytics & Performance
- ✅ **Overall Summary**: Total income, expenses, and net balance
- ✅ **Category Breakdown**: Percentage and total per category
- ✅ **Monthly Trends**: Growth and spending patterns

### 4. Access Control
- ✅ **RBAC**: Role-Based Access Control enforced at the middleware level
- ✅ **Object Ownership**: Analysts can only edit their own records
- ✅ **Admin Override**: Admins have full access to all records and user management

### 5. Additional Features
- ✅ **Search**: Full-text search in record descriptions
- ✅ **Pagination**: Efficient data loading with configurable page sizes
- ✅ **Swagger UI**: Interactive API documentation at `/api-docs/`
- ✅ **Security**: Implementation of Helmet, CORS, and Rate Limiting

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Node.js / Express 5.0 |
| **API** | RESTful API with JSON |
| **Database** | MongoDB (Atlas / Local) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Documentation** | Swagger / OpenAPI 3.0 |
| **Security** | Helmet, Bcrypt, Express-Rate-Limit |

## 💻 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (Running locally or Atlas URI)

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/balaji-133/Zorvyn-Finance-Project-Backend.git
   cd finance-data-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server will run at: `http://localhost:5000`
   API Docs: `http://localhost:5000/api-docs/`

## 🔌 API Endpoints Reference

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user profile

### 💰 Financial Records
- `GET /api/records` - List all records (Supports filter, search, pagination)
- `GET /api/records/:id` - Get specific record
- `POST /api/records` - Create new record (Analyst/Admin)
- `PUT /api/records/:id` - Update record (Owner/Admin)
- `DELETE /api/records/:id` - Soft delete record (Admin)

### 📊 Analytics & Dashboard
- `GET /api/summary` - Get comprehensive dashboard stats

## 🔐 Access Control Matrix

| Action | Viewer | Analyst | Admin |
| :--- | :---: | :---: | :---: |
| View Records | ✅ | ✅ | ✅ |
| Create Records | ❌ | ✅ | ✅ |
| Edit Own Records | ❌ | ✅ | ✅ |
| Edit Any Record | ❌ | ❌ | ✅ |
| Delete Records | ❌ | ❌ | ✅ |
| View Analytics | ✅ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

---

### ✉️ Support
For issues or questions, please open an issue in the GitHub repository.

**Created: April 3, 2026**
**Status: Production Ready (v1.1 - Optimized)**
