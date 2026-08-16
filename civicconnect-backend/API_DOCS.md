# Public Grievance Redressal System - Auth API Documentation

**Base URL:** http://localhost:5000/api/auth  
**Headers:** Content-Type: application/json

---

## 1. User Signup (Citizen)
Registers a new citizen user account.

* Method: POST
* URL: http://localhost:5000/api/auth/signup
* Request Body:
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "password": "Password123"
}

* Success Response (201 Created):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "de7129d9-4178-4efd-96e6-00a7b8323c37",
    "email": "john@gmail.com",
    "role": "user"
  }
}

---

## 2. Login (All Roles: User, Officer, Super Admin)
Authenticates any user and returns a JWT token with role information.

* Method: POST
* URL: http://localhost:5000/api/auth/login
* Request Body:
{
  "email": "john@gmail.com",
  "password": "Password123"
}

* Success Response (200 OK):
{
  "success": true,
  "token": "YOUR_JWT_TOKEN_HERE",
  "user": {
    "id": "de7129d9-4178-4efd-96e6-00a7b8323c37",
    "email": "john@gmail.com",
    "role": "user"
  }
}

* Frontend Handling:
1. Store token in localStorage or Cookies.
2. Redirect user based on role ("user", "officer", "super_admin").

---

## 3. Get Current Profile
Fetches details of the currently logged-in user.

* Method: GET
* URL: http://localhost:5000/api/auth/me
* Headers:
  Authorization: Bearer <YOUR_JWT_TOKEN>

* Success Response (200 OK):
{
  "success": true,
  "user": {
    "id": "de7129d9-4178-4efd-96e6-00a7b8323c37",
    "full_name": "John Doe",
    "email": "john@gmail.com",
    "role": "user",
    "department": null,
    "created_at": "2026-08-16T09:47:32.156348+00:00"
  }
}

---

## 4. Create Officer Account (Super Admin Only)
Allows Super Admin to register a department officer.

* Method: POST
* URL: http://localhost:5000/api/auth/create-officer
* Headers:
  Authorization: Bearer <YOUR_SUPER_ADMIN_TOKEN>
  Content-Type: application/json

* Request Body:
{
  "fullName": "Saniya Lanjewar",
  "email": "saniya@gmail.com",
  "password": "Password123",
  "department": "IT Support"
}

* Success Response (201 Created):
{
  "success": true,
  "message": "Officer account created successfully!",
  "officer": {
    "id": "d77f8abc-6f8b-4aa4-a093-8884f7c84b53",
    "email": "saniya@gmail.com",
    "fullName": "Saniya Lanjewar",
    "role": "officer",
    "department": "IT Support"
  }
}

---

## 5. Fetch All Users (Super Admin Only)
Fetches the entire list of users across all roles.

* Method: GET
* URL: http://localhost:5000/api/auth/all-users
* Headers:
  Authorization: Bearer <YOUR_SUPER_ADMIN_TOKEN>

* Success Response (200 OK):
{
  "success": true,
  "count": 2,
  "users": [
    {
      "id": "de7129d9-4178-4efd-96e6-00a7b8323c37",
      "full_name": "John Doe",
      "email": "john@gmail.com",
      "role": "super_admin",
      "department": null,
      "created_at": "2026-08-16T09:47:32.156348+00:00"
    },
    {
      "id": "049560d8-f742-4fc9-b908-5090bb538457",
      "full_name": "Sejal Kable",
      "email": "sejal@gmail.com",
      "role": "user",
      "department": null,
      "created_at": "2026-08-16T09:54:52.315752+00:00"
    }
  ]
}