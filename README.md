

# **Mini User Management System**

A full-stack **Role-Based User Management System** built as part of the **PurpleMerit Backend Developer Intern Assessment**.
Includes authentication, authorization, admin controls, secure APIs, testing, and deployment.

---

## 🌍 **Live Project**

Frontend (Vercel):
👉 [https://user-management-system-virid-omega.vercel.app/](https://user-management-system-virid-omega.vercel.app/)

Backend (Render API Base URL):
👉 `https://user-management-system-2e8v.onrender.com/api`

---

## ✅ **Features**

### 👤 Authentication

* User Signup (JWT + HttpOnly Cookies)
* User Login
* Logout
* Password Hashing (bcrypt)
* Email + Password Validation
* Last Login Tracking

---

### 🔐 Authorization (RBAC)

* Roles → `admin`, `user`
* Protected Routes
* Admin-only access

---

### 👨‍💼 Admin Features

* View All Users
* Pagination (10 users per page)
* Activate User
* Deactivate User

---

### 👤 User Features

* View Profile
* Update Profile
* Change Password

---

### 🛡 Security

* JWT Auth (Stored in Secure Cookie)
* CORS Configured for Production
* Input Validation (express-validator)
* Proper HTTP Status Codes + Consistent Responses

---

### 🗄 Database Schema (MongoDB)

```
email (unique)
password (hashed)
fullName
role (admin/user)
status (active/inactive)
createdAt
updatedAt
lastLogin
```

---

## 🧪 **Testing**

Backend tests implemented using:

* Jest
* Supertest
* MongoDB Memory Server

Run tests:

```bash
cd backend
npm install
npm test
```

✔ Signup
✔ Duplicate Signup
✔ Login
✔ /me Protected Route
✔ Admin User Fetch

---

## 🛠 **Tech Stack**

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT + Cookies
* express-validator
* Jest + Supertest

### Frontend

* React + Vite
* Tailwind CSS
* Axios
* React Router
* React Hot Toast

### Deployment

* Backend → Render
* Frontend → Vercel
* Database → MongoDB Atlas

---

## ⚙️ **Setup Instructions**

---

### 📌 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```
PORT=
MONGO_URI=
JWT_SECRET=
COOKIE_NAME=
CLIENT_URL=
NODE_ENV=
```

---

### 📌 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env`

```
VITE_API_URL=<backend_api_base_url>
```

---

## 🚀 Deployment Instructions

---

### **Backend Deployment (Render / Railway)**

1️⃣ Push project to GitHub
2️⃣ Create **New Web Service**
3️⃣ Set Build & Run

```
npm install
npm start
```

4️⃣ Add Environment Variables

```
PORT
MONGO_URI
JWT_SECRET
COOKIE_NAME
CLIENT_URL
NODE_ENV=production
```

5️⃣ Deploy
6️⃣ Copy Backend URL

---

### **Frontend Deployment (Vercel)**

1️⃣ Go to Vercel
2️⃣ Import repo
3️⃣ Select `/frontend` as project root
4️⃣ Build Settings:

```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5️⃣ Add env:

```
VITE_API_URL=<backend_url>/api
```

6️⃣ Deploy
7️⃣ Done 🎯

---

## 📜 API Documentation

Base URL:

```
/api
```

---

### 🔹 Signup

**POST** `/auth/signup`

Request:

```json
{
  "fullName":"John Doe",
  "email":"john@gmail.com",
  "password":"123456",
  "role":"user"
}
```

Response:

```json
{
  "message":"Signup successful",
  "user":{
    "_id":"...",
    "fullName":"John Doe",
    "email":"john@gmail.com",
    "role":"user",
    "status":"active"
  }
}
```

---

### 🔹 Login

**POST** `/auth/login`

Request:

```json
{
  "email":"john@gmail.com",
  "password":"123456"
}
```

Response:

```json
{
  "message":"Login successful",
  "user":{
    "_id":"...",
    "fullName":"John Doe",
    "email":"john@gmail.com",
    "role":"user"
  }
}
```

Cookie Set:

```
authToken=<JWT>
```

---

### 🔹 Current User

**GET** `/auth/me`

Response:

```json
{
  "_id":"...",
  "email":"john@gmail.com",
  "fullName":"John Doe",
  "role":"user",
  "status":"active"
}
```

---

### 🔹 Logout

**POST** `/auth/logout`

Response:

```json
{
  "message":"Logged out successfully"
}
```

---

## 👨‍💼 Admin Routes (Admin Only)

### Get Users

**GET**

```
/admin/users?page=1
```

---

### Activate User

**PATCH**

```
/admin/user/:id/activate
```

---

### Deactivate User

**PATCH**

```
/admin/user/:id/deactivate
```

---

## 👤 User Profile Routes

### Update Profile

**PUT**

```
/user/update
```

---

### Change Password

**PATCH**

```
/user/change-password
```

