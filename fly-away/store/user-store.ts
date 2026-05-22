import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserStoreState } from "@/types/store";

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      sessionToken: null,
      user: null,
      cachedBookings: [],
      setSessionToken: (token) => set({ sessionToken: token }),
      setUser: (user) => set({ user }),
      setCachedBookings: (bookings) => set({ cachedBookings: bookings }),
      resetStore: () =>
        set({
          sessionToken: null,
          user: null,
          cachedBookings: [],
        }),
    }),
    {
      name: "flyaway-user-store",
      partialize: (state) => ({
        sessionToken: state.sessionToken,
      }),
    },
  ),
);
