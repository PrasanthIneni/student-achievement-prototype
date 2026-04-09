# 🚀 AstraLink: Client Setup Guide

Welcome to **AstraLink**, a premium Student Extracurricular Achievement Management System. Follow the steps below to get the application running on your laptop.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

1.  **Java JDK (Version 17 or later)**: Required for the backend.
    *   [Download JDK 17+](https://www.oracle.com/java/technologies/downloads/)
2.  **Node.js (Version 18 or later)**: Required for the frontend.
    *   [Download Node.js](https://nodejs.org/)

---

## 🛠️ Step-by-Step Setup

### 1. Launch the Backend (Spring Boot)
The backend handles the data, authentication, and persistence (H2 Database).

1.  Open a terminal or Command Prompt.
2.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
3.  Run the application using the Maven wrapper:
    ```bash
    .\mvnw.cmd spring-boot:run
    ```
    *(Wait for the message: `Started StudentActivityApplication`)*
4.  The API will be available at: `http://localhost:8081`

### 2. Launch the Frontend (React + Vite)
The frontend provides the premium, animated user interface.

1.  Open a **new** terminal or Command Prompt window.
2.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
3.  Install dependencies (only required for the very first run):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Access the application at the URL shown (usually `http://localhost:5173`).

---

## 💎 Features Included
*   **Animated Themed Background**: Floating icons for Sports, Tech, and Books.
*   **Persistent Storage**: Data is saved to a local `studentdb` file and survives restarts.
*   **Role-Based Access**: Specialized dashboards for Admins and Students.
*   **Profile Management**: Expanded fields for professional student identity.

---

## 🔐 Default Debug Accounts
*   **Admin**: `admin` / `admin`
*   **Student**: `student1` / `password`

*For any issues, please ensure ports 8081 and 5173 are not being used by other applications.*
