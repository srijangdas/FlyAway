"use client";

import { logout } from "@/app/actions/auth";
import { useFlightStore } from "@/store/flight-store";
import { useUserStore } from "@/store/user-store";

export default function LogoutButton() {
  const resetFlightStore = useFlightStore.getState().resetStore;
  const resetUserStore = useUserStore.getState().resetStore;

  async function handleLogout() {
    resetFlightStore();
    resetUserStore();
    await logout();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-2xl
              bg-red-500
              px-5 py-3
              font-semibold
              text-white"
    >
      Logout
    </button>
  );
}
