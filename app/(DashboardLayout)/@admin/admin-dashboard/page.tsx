import { redirect } from 'next/navigation';
import React from 'react';

const AdminDashboard = () => {
    return   redirect("admin-dashboard/users")
    
};

export default AdminDashboard;