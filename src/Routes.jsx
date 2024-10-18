import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/PatientDashboard";
import PatientDetails from "./pages/PatientDetails";
import ProtectedLogin from "./components/ProtectedLogin";
import PriorAuthorization from "./pages/PriorAuthorization";
import AuthorizationList from "./pages/AuthorizationList";



function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/login" element = {<ProtectedLogin/>} />

                <Route path="/" element = {<ProtectedRoute component = {PatientDashboard}/>}/>
                <Route path="/patientDetails" element = {<ProtectedRoute component={PatientDetails}/>}/>
                <Route path="/PriorAuthorization" element = {<ProtectedRoute component={PriorAuthorization}/>}/>
                <Route path="/AuthorizationList" element = {<ProtectedRoute component={AuthorizationList}/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;