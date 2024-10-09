"use client";
/* eslint-disable @next/next/no-img-element */

import { useSession } from "next-auth/react";
import SpinnerMini from "./SpinnerMini";

function User() {
  const { data: session, status } = useSession();

  if (status === "loading") return <SpinnerMini />;

  return (
    <span className="text-accent-300 flex items-center gap-4">
      <img
        src={session?.user?.image}
        alt={session?.user?.name}
        className="rounded-full h-10 "
      />
      {session?.user?.name.split(" ").at(0)}
    </span>
  );
}

export default User;
