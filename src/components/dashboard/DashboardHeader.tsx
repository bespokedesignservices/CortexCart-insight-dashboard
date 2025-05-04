
import React from "react";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-recoai-gray">
        Welcome back, {userName}! Here's an overview of your store's performance.
      </p>
    </div>
  );
};

export default DashboardHeader;
