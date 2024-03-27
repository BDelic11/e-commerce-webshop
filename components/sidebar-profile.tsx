import { currentUser } from "@/lib/auth";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SidebarProfile = async () => {
  const user = await currentUser();
  const initials = user?.name?.toString()[0];

  return (
    <div className="flex flex-col  rounded-md  py-4 px-2">
      <div className="flex lg:flex-row lg:gap-2 lg:justify-start lg:align-middle">
        <Avatar>
          <AvatarImage src="" alt="avatar image" />
          <AvatarFallback className="bg-gray-200 text-black lg:font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="lg:flex lg:flex-col lg:justify-start lg:align-middle">
          <h1 className="lg:text-lg lg:w-max lg:my-auto">Shop name</h1>
          <p className="lg:text-xs lg:text-gray-300">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
