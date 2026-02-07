import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = () => {
    return   redirect("dashboard/my-cart")
};

export default Dashboard;