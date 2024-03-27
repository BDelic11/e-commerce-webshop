import React from "react";

import SidebarProfile from "./sidebar-profile";
import SidebarLinks from "./sidebar-links";
import { Button } from "./ui/button";
import LogoutButton from "./auth/logout-button";

const AdminSidebar = () => {
  return (
    <aside className="md:fixed md:flex md:flex-col md:justify-start md:pt-8 md:gap-32 md:w-1/5 md:h-screen md:text-white md:bg-darkBackground md:p-2 ">
      <SidebarProfile />
      <SidebarLinks />
      <center>
        <LogoutButton>
          <Button
            className="w-2/3 bg-lighterDarkBackground text-white rounded-lg hover:bg-hoverButton"
            variant="secondary"
          >
            Odjavi se
          </Button>
        </LogoutButton>
      </center>
    </aside>
  );
};

export default AdminSidebar;
