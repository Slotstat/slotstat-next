"use client";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileMenu from "./ProfileMenu";

function Profile() {
  const { data: session, status } = useSession();

  return (
    <div>
      <ProfileMenu />
    </div>
  );
}

export default Profile;
