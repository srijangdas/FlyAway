"use client";

import Navbar from "@/components/layout/Navbar";

import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function ConfirmationPage() {
  const supabase = createClient();

  const searchParams = useSearchParams();

  const pnr = searchParams.get("pnr");

  const [booking, setBooking] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [flight, setFlight] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [seat, setSeat] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [passenger, setPassenger] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      if (!pnr) return;

      // BOOKING
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("pnr_code", pnr)
        .single();

      if (!bookingData) return;

      setBooking(bookingData);

      // FLIGHT
      const { data: flightData } = await supabase
        .from("flights")
        .select("*")
        .eq("id", bookingData.flight_id)
        .single();

      setFlight(flightData);

      // SEAT
      const { data: seatData } = await supabase
        .from("seats")
        .select("*")
        .eq("id", bookingData.seat_id)
        .single();

      setSeat(seatData);

      // PASSENGER
      const { data: passengerData } = await supabase
        .from("passengers")
        .select("*")
        .eq("booking_id", bookingData.id)
        .single();

      setPassenger(passengerData);

      setLoading(false);
    }

    loadBooking();
  }, [pnr]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-slate-50
        px-4 py-10
        dark:bg-slate-950
      "
      >
        <div
          className="
          mx-auto
          max-w-4xl
        "
        >
          <div
            className="
            rounded-[32px]
            bg-white
            p-8 shadow-lg
            dark:bg-slate-900
          "
          >
            {/* SUCCESS */}
            <div className="text-center">
              <div
                className="
                mx-auto flex
                h-24 w-24
                items-center
                justify-center
                rounded-full
                bg-green-100
                text-5xl
              "
              >
                ✅
              </div>

              <h1
                className="
                mt-5
                text-4xl
                font-bold
              "
              >
                Booking Confirmed
              </h1>

              <p
                className="
                mt-2
                text-slate-500
              "
              >
                Your ticket has been booked successfully.
              </p>
            </div>

            {/* PNR */}
            <div
              className="
              mt-8 rounded-3xl
              bg-blue-50
              p-6 text-center
              dark:bg-slate-800
            "
            >
              <p
                className="
                text-sm
                text-slate-500
              "
              >
                PNR CODE
              </p>

              <h2
                className="
                text-4xl
                font-bold
                text-blue-600
              "
              >
                {pnr}
              </h2>
            </div>

            {/* DETAILS */}
            <div
              className="
              mt-8 grid gap-6
              md:grid-cols-2
            "
            >
              <div
                className="
                rounded-3xl
                border p-5
              "
              >
                <h3
                  className="
                  text-xl
                  font-bold
                "
                >
                  Flight Details
                </h3>

                <div className="mt-4 space-y-3">
                  <p>Flight: {flight?.flight_no}</p>

                  <p>
                    Route: {flight?.origin}→{flight?.destination}
                  </p>

                  <p>Seat: {seat?.seat_number}</p>

                  <p>Class: {seat?.class}</p>
                </div>
              </div>

              <div
                className="
                rounded-3xl
                border p-5
              "
              >
                <h3
                  className="
                  text-xl
                  font-bold
                "
                >
                  Passenger
                </h3>

                <div className="mt-4 space-y-3">
                  <p>Name: {passenger?.full_name}</p>

                  <p>Passport: {passenger?.passport_no}</p>

                  <p>Nationality: {passenger?.nationality}</p>
                </div>
              </div>
            </div>

            {/* PRICE */}
            <div
              className="
              mt-8
              flex items-center
              justify-between
              border-t
              pt-6
              text-2xl
              font-bold
            "
            >
              <span>Total Paid</span>

              <span>₹{booking?.total_price}</span>
            </div>

            <Link
              href="/my-bookings"
              className="
              mt-8 flex
              justify-center
              rounded-2xl
              bg-blue-600
              py-5
              text-lg
              font-semibold
              text-white
            "
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
