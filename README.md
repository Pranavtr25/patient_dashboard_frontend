# Frontend - Healthcare Provider Dashboard

This frontend application is built using **React** with **Vite** as the build tool. It allows healthcare providers to view patient data, search for patients, and request prior authorizations.

## Features

- Searchable patient dashboard with pagination.
- View details of individual patients.
- Prior authorization request submission.
  
## Installation and Setup

### Prerequisites
- **Node.js** 
- Backend server URL 

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Pranavtr25/patient_dashboard_frontend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd patient_dashboard_frontend
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root directory. Add the backend URL:
    ```bash
    VITE_SERVER_URL=http://localhost:3000

5. Run the development server:
    ```bash
    npm run dev
    ```

6. The application should now be running at `http://localhost:5173`.

### Environment Variables

 Variable           Description  

 `VITE_SERVER_URL`  The URL of your backend API              

## Pages

### **Login**
- **URL:** `/login`
  - Login page for healthcare providers.
  
### **Patient Dashboard**
- **URL:** `/patient-dashboard`
  - Displays a paginated list of patients with a search feature.

### **Patient Details**
- **URL:** `/patient-details`
  - Displays detailed information about a selected patient.
  
