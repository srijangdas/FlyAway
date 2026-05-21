"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Page() {
  const bookings = [
    {
      id: 1,
      from: "JFK",
      to: "LHR",
      date: "24 May",
      pnr: "SKY123",
      status: "Confirmed",
    },
  ];

  const router = useRouter();
const supabase =
  createClient();

useEffect(() => {
  async function checkAuth() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    }
  }

  checkAuth();
}, []);

  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-slate-50
        p-6 dark:bg-slate-950
      "
      >
        <div className="mx-auto max-w-6xl">
          <h1
            className="
            text-4xl font-bold
          "
          >
            My Bookings
          </h1>

          <div className="mt-8 space-y-5">
            {bookings.map(
              (booking) => (
                <Link
                  key={booking.id}
                  href={`/my-bookings/${booking.id}`}
                  className="
                  block rounded-[32px]
                  bg-white p-6
                  shadow-lg
                  dark:bg-slate-900
                "
                >
                  <h2
                    className="
                    text-2xl
                    font-bold
                  "
                  >
                    {booking.from}
                    → {booking.to}
                  </h2>

                  <p>
                    PNR:
                    {booking.pnr}
                  </p>

                  <p>
                    {
                      booking.status
                    }
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}