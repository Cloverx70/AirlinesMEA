import React from "react";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import ProfileMenu from "../Components/ProfileMenu";
import DashboardPreview from "../Components/DashboardIPreview";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <section>
      <Helmet>
        <title>MEA-Dashboard</title>
      </Helmet>
      <Login />
      <Logout />
      <ProfileMenu />
      <DashboardPreview />
    </section>
  );
};

export default Dashboard;
