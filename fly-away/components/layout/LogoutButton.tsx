"use client";

import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="rounded bg-red-500 p-2 text-white"
    >
      Logout
    </button>
  );
}