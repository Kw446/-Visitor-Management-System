# Visitor Management API

A NestJS REST API with JWT Authentication and Visitor CRUD operations.

## Tech Stack

- NestJS
- MySQL
- TypeORM
- JWT Authentication
- class-validator

## Prerequisites

- Node.js v18+
- MySQL running locally
- npm

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

### 2. Install dependencies

npm install

### 3. Create MySQL database

mysql -u root -p -e "CREATE DATABASE visitordb;"

### 4. Configure environment

Create a `.env` file in the root folder:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=visitordb
JWT_SECRET=your_super_secret_key

### 5. Run the project

npm run start:dev

Server starts at: http://localhost:3000

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login and get JWT token | No |

### Visitors

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /visitors | Create visitor | Yes |
| GET | /visitors | Get all visitors | Yes |
| GET | /visitors/:id | Get visitor by ID | Yes |
| PUT | /visitors/:id | Update visitor | Yes |
| DELETE | /visitors/:id | Delete visitor | Yes |
| PATCH | /visitors/:id/approve | Approve visitor | Yes |

---

## How to Use

### Step 1 — Register
POST /auth/register
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}

### Step 2 — Login and copy token
POST /auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}

Response:
{
  "accessToken": "eyJhbGci..."
}

### Step 3 — Use token in all visitor requests
Add this header to every visitor API call:

Authorization: Bearer eyJhbGci...

### Step 4 — Create a Visitor
POST /visitors
Authorization: Bearer eyJhbGci...
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "unitNumber": "A-101",
  "visitDate": "2026-05-26T10:00:00.000Z",
  "status": "PENDING"
}

### Step 5 — Approve a Visitor
PATCH /visitors/1/approve
Authorization: Bearer eyJhbGci...

---

## Visitor Status Values

- PENDING
- APPROVED
- REJECTED