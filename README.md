# InterLinkD

A full-stack social networking platform built with React + Vite, Express, and MongoDB. InterLinkD enables users to connect, chat, and create group discussions. An admin dashboard provides monitoring capabilities, ensuring the network remains safe and engaging.

## Features

### User Features
1. **User Registration & Login**: Users can register and log in using a unique username.
2. **User Search**: Easily search for other users by username.
3. **Friend Requests**: Users can send, receive, and accept friend requests.
4. **Real-time Notifications**: Users receive notifications for friend requests and group activities.
5. **Chat Functionality**:
   - **One-on-One Chat**: Send messages and attachments (using Cloudinary for media storage).
   - **Group Chat**: Create group chats with a minimum of 3 members and up to 100 members.
6. **Group Management**:
   - Group admins can add or remove members, delete the group, and reassign admin roles.
   - Members can leave groups, and if an admin leaves, a new admin is automatically assigned.
7. **Chat List**: View all current chats.
8. **Chat/Unfriend Options**: Delete chat history or unfriend users.

### Admin Dashboard
An admin dashboard is accessible only with a secret key, allowing the admin to:
- View and manage users.
- Oversee chat and message logs.

## Project Structure

The project follows a full-stack architecture:
- **Frontend**: Located in the `./client` folder, built with React + Vite.
- **Backend**: Located in the `./server` folder, built with Express and MongoDB.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (Atlas or local instance)
- **Cloudinary** (for media storage)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/charansingh25/interlinkd.git
   cd interlinkd
   ```

2. **Set Up Environment Variables**

    In the root directory, create `.env` files for both the frontend and backend based on the provided samples below.

    **Frontend .env**
     ```bash
    VITE_SERVER=https://interlinkd.onrender.com
    ```

    **Backend .env**
    ```bash
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    ADMIN_SECRET_KEY=<Admin Secret Key>
    NODE_ENV=development
    CLIENT_URL=https://inter-linkd.vercel.app
    PORT=5000
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    ```

3. **Install Dependencies**

    Navigate to both `client` and `server` folders and install dependencies:
    ```bash
    # Frontend
    cd server
    npm install
    
    # Backend
    cd ../client
    npm install
    ```

4. **Start the Application**

    **Backend**: Start the server in the `server` folder
    ```bash
    npm run dev
    ```

    **Frontend**: Start the client in the `client` folder.
    ```bash
    npm run dev
    ```

    The application will be running, and the frontend can be accessed at the specified client URL.

## Folder Structure

```bash
interlinkd/
├── client/                   # Frontend code
│   ├── public/               # Static files
│   ├── src/                  # React components and logic
│   └── .env                  # Frontend environment variables
├── server/                   # Backend code
│   ├── models/               # Database models
│   ├── controllers/          # API controllers
│   ├── routes/               # Express routes
│   └── .env                  # Backend environment variables
└── README.md
```

## Technologies Used

1. Frontend: React, Vite
2. Backend: Express, Node.js, MongoDB
3. Media Storage: Cloudinary
4. Authentication: JWT
5. Admin Access: Secret key-protected dashboard

