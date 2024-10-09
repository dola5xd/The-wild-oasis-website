"use client";

import { useSession } from "next-auth/react";
import UserAvatar from "../_components/UserAvatar";
import SpinnerMini from "../_components/SpinnerMini";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") return <SpinnerMini />;

  return (
    <h3 className="text-2xl text-accent-400 font-semibold flex items-center gap-4 mb-7">
      <UserAvatar />
      Hi {session.user.name.split(" ").at(0)}
    </h3>
  );
}
