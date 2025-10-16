[README.md](https://github.com/user-attachments/files/22948407/README.md)
# Security Project

## Overview

This project is a web application built with **Node.js** and **Express.js**, providing a secure user authentication system using **Google OAuth 2.0**.  
The app integrates with **MongoDB** to store user data and manages sessions using `express-session` and `connect-mongo`.

---

## Features

- **User Authentication:** Login/Register using a Google account.  
- **Session Management:** Uses `express-session` to track user sessions.  
- **Data Storage:** Saves user data in a MongoDB database.  
- **Protected Routes:** Uses `connect-ensure-login` middleware to secure routes that require authentication.

---

## Tech Stack

**Backend:**
- Node.js  
- Express.js  
- Passport.js (with Google OAuth 2.0 strategy)  
- Mongoose (ODM for MongoDB)  
- bcrypt (for password hashing, though the password field is currently unused in the schema)  
- dotenv (for environment variable management)

**Database:**
- MongoDB

---

## Getting Started

Follow these steps to run the project locally:

### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or later)  
- npm (Node package manager)  
- MongoDB (local installation or MongoDB Atlas account)

---

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-link>
   cd Security
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=mongodb://localhost:27017/security_db  # or your MongoDB Atlas connection string
SECRET=your_session_secret_key                   # strong session secret
CLIENT_ID=your_google_client_id                  # from Google Cloud Console
CLIENT_SECRET=your_google_client_secret          # from Google Cloud Console
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/users/auth/google/callback
PORT=3000                                        # optional, default is 3000
```

**Note:**  
To get your `CLIENT_ID` and `CLIENT_SECRET`, create a project in [Google Cloud Console](https://console.cloud.google.com/) and configure OAuth 2.0 credentials.

---

### Running the Server

Start the server with:
```bash
npm start
```

The app will run on the port defined in `.env` (default: `http://localhost:3000`).

---

## API Routes

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **GET** | `/api/v1/users/` | Home page — shows login option if not authenticated |
| **GET** | `/api/v1/users/auth/google` | Initiates Google OAuth process |
| **GET** | `/api/v1/users/auth/google/callback` | Google OAuth callback handler |
| **GET** | `/api/v1/users/profile` | Displays user profile (requires login) |
| **GET** | `/api/v1/users/logout` | Logs out the user |

---

## Contributing

Contributions are welcome!  
To contribute:
1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).  
4. Push to your branch (`git push origin feature/AmazingFeature`).  
5. Open a Pull Request.


---

## Author

**Anton Emad**
