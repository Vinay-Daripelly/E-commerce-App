# MERN E-Commerce App - ModernShop

A full-stack e-commerce web application built from scratch using the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

-   User Authentication (Register & Login) with JWT
-   Dynamic Product Catalog with Filtering (by Category & Price)
-   Database-backed Shopping Cart per User
-   Protected Routes for User-specific Actions
-   Toast Notifications for User Feedback
-   Responsive design for a seamless experience on all devices.

## 💻 Tech Stack

-   **Frontend:** React, Vite, React Router, Tailwind CSS, Axios, React Hot Toast
-   **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
-   **Authentication:** JSON Web Tokens (JWT), bcryptjs

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Vinay-Daripelly/E-commerce-App.git](https://github.com/Vinay-Daripelly/E-commerce-App.git)
    cd E-commerce-App
    ```
2.  **Setup Backend:**
    ```bash
    cd modern-shop-backend
    npm install
    # Create a .env file and add MONGO_URI and JWT_SECRET
    npm run dev
    ```
3.  **Setup Frontend:** (In a new terminal)
    ```bash
    cd modern-shop-frontend
    npm install
    # Create a .env file and add VITE_API_BASE_URL=http://localhost:5000
    npm run dev
    ```