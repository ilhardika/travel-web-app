import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">Welcome, Admin!</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
