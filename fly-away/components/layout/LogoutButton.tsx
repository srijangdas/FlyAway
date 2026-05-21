"use client";

import { logout } from "@/app/actions/auth";
import Link from "next/link";

export default function LogoutButton() {
  return (
    <Link href={"/"}>
    <button
      onClick={() => logout()}
      className="rounded-2xl
              bg-red-500
              px-5 py-3
              font-semibold
              text-white"
              
    >
      Logout
    </button>
    </Link>
  );
}