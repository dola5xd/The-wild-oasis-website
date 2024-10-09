/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";

function UserAvatar() {
  const { data: session } = useSession();

  return (
    <img
      referrerPolicy="no-referrer"
      src={session?.user?.image}
      alt={session?.user?.name}
      className="rounded-full h-10 "
    />
  );
}

export default UserAvatar;
