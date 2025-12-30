# Mini User Management System

A full-stack user management system built as part of the **PurpleMerit Backend Developer Intern Assessment**.  
Supports authentication, authorization, admin management, secure APIs, and deployment.

 

---

## ✅ Features

### 👤 Authentication
- User Signup (JWT + Cookies)
- User Login
- Logout
- Password hashing (bcrypt)
- Email + Password validation
- Last Login Tracking

### 🔐 Authorization (RBAC)
- Roles: `admin`, `user`
- Protected Routes
- Admin-only access

### 👨‍💼 Admin Features
- View all users
- Pagination (10 per page)
- Activate User
- Deactivate User

### 👨‍🎓 User Features
- View profile
- Update profile
- Change password

### 🛡 Security
- JWT Auth
- Cookie-Based Session
- CORS Configured
- Input Validation (express-validator)
- HTTP Status + Standard Responses

---

## 🗄 Database Schema
- email (unique)
- password (hashed)
- fullName
- role (admin/user)
- status (active/inactive)
- createdAt
- updatedAt
- lastLogin


---

## 🧪 Testing
Backend tests written using:

- Jest
- Supertest
- MongoDB Memory Server

To run:
cd backend
npm install
npm test


All 5 required tests implemented:
✔ Signup  
✔ Duplicate signup  
✔ Login  
✔ /me protected route  
✔ Admin fetch users  

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + Cookies
- express-validator
- Jest + Supertest

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router
- react-hot-toast

### Deployment
- Backend → Render / Railway
- Frontend → Vercel
- DB → MongoDB Atlas

---

## ⚙️ Setup Instructions

### 📌 Backend Setup
cd backend
npm install
npm run dev


Create `.env`:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
COOKIE_NAME=authToken
CLIENT_URL=http://localhost:5173


---

### 📌 Frontend Setup
cd frontend
npm install
npm run dev
