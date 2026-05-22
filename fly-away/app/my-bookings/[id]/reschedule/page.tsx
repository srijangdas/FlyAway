"use client";

import Navbar from "@/components/layout/Navbar";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";

import { Booking } from "@/types/booking";

import { Flight } from "@/types/flight";

export default function ReschedulePage() {
  const supabase = createClient();

  const router = useRouter();

  const params = useParams();

  const bookingId = params.id as string;

  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState<Booking | null>(null);

  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);

  const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);

  const [selectedFlight, setSelectedFlight] = useState<string>("");

  async function loadData() {
    try {
      // BOOKING
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (!bookingData) {
        toast.error("Booking not found");

        return;
      }

      setBooking(bookingData);

      // CURRENT FLIGHT
      const { data: flightData } = await supabase
        .from("flights")
        .select("*")
        .eq("id", bookingData.flight_id)
        .single();

      if (!flightData) return;

      setCurrentFlight(flightData);

      // FIND ALTERNATIVE FLIGHTS
      const { data: flights } = await supabase
        .from("flights")
        .select("*")
        .eq("origin", flightData.origin)
        .eq("destination", flightData.destination)
        .neq("id", flightData.id)
        .eq("status", "scheduled")
        .order("departs_at", {
          ascending: true,
        });

      setAvailableFlights(flights ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleReschedule() {
    if (!selectedFlight || !booking) {
      toast.error("Select a flight");

      return;
    }

    try {
      // free old seat
      await supabase
        .from("seats")
        .update({
          is_available: true,
        })
        .eq("id", booking.seat_id);

      // update booking
      const { error } = await supabase
        .from("bookings")
        .update({
          flight_id: selectedFlight,

          status: "rescheduled",
        })
        .eq("id", booking.id);

      if (error) {
        toast.error("Failed to reschedule");

        return;
      }

      toast.success("Flight rescheduled");

      router.push(`/my-bookings/${booking.id}`);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div
        className="
        flex min-h-screen
        items-center
        justify-center
      "
      >
        Loading...
      </div>
    );
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
          max-w-5xl
        "
        >
          <div
            className="
            rounded-[32px]
            bg-white
            p-8
            shadow-lg
            dark:bg-slate-900
          "
          >
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              Reschedule Flight
            </h1>

            {/* CURRENT */}
            <div className="mt-8">
              <h2
                className="
                text-xl
                font-semibold
              "
              >
                Current Flight
              </h2>

              <div
                className="
                mt-4
                rounded-2xl
                border
                p-5
              "
              >
                <h3
                  className="
                  text-2xl
                  font-bold
                "
                >
                  {currentFlight?.flight_no}
                </h3>

                <p className="mt-2">
                  {currentFlight?.origin}
                  {" → "}
                  {currentFlight?.destination}
                </p>

                <p className="mt-2">
                  Departure:{" "}
                  {new Date(currentFlight?.departs_at ?? "").toLocaleString()}
                </p>
              </div>
            </div>

            {/* AVAILABLE */}
            <div className="mt-10">
              <h2
                className="
                text-xl
                font-semibold
              "
              >
                Available Flights
              </h2>

              <div className="mt-5 space-y-4">
                {availableFlights.map((flight) => (
                  <button
                    key={flight.id}
                    onClick={() => setSelectedFlight(flight.id)}
                    className={`
                        w-full
                        rounded-2xl
                        border
                        p-5
                        text-left
                        transition
                        ${
                          selectedFlight === flight.id
                            ? "border-blue-600 bg-blue-50"
                            : ""
                        }
                      `}
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                      "
                    >
                      <div>
                        <h3
                          className="
                            text-xl
                            font-bold
                          "
                        >
                          {flight.flight_no}
                        </h3>

                        <p>
                          {flight.origin}→{flight.destination}
                        </p>

                        <p className="mt-2">
                          {new Date(flight.departs_at).toLocaleString()}
                        </p>
                      </div>

                      <h3
                        className="
                          text-2xl
                          font-bold
                          text-blue-600
                        "
                      >
                        ₹{flight.base_price}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleReschedule}
              className="
              mt-8
              w-full
              rounded-2xl
              bg-blue-600
              py-5
              text-lg
              font-semibold
              text-white
            "
            >
              Confirm Reschedule
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
