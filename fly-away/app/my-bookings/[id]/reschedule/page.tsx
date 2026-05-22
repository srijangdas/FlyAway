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

      // FIND OTHER FLIGHTS
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
    } catch (error) {
      console.error(error);

      toast.error("Failed to load flights");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  async function handleReschedule(flightId: string) {
    if (!booking) return;

    try {
      // FREE OLD SEAT
      await supabase
        .from("seats")
        .update({
          is_available: true,
        })
        .eq("id", booking.seat_id);

      // UPDATE BOOKING
      const { error } = await supabase
        .from("bookings")
        .update({
          flight_id: flightId,

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
        text-2xl
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
          max-w-6xl
        "
        >
          {/* HEADER */}
          <div className="mb-10">
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              Reschedule Flight
            </h1>

            <p
              className="
              mt-2
              text-slate-500
            "
            >
              Select another flight on the same route.
            </p>
          </div>

          {/* CURRENT FLIGHT */}
          <div
            className="
            mb-10
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
          >
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              Current Flight
            </h2>

            <div className="mt-5">
              <div
                className="
                flex flex-wrap
                items-center
                gap-3
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

                <span
                  className="
                  rounded-full
                  bg-blue-100
                  px-3 py-1
                  text-sm
                  font-medium
                  text-blue-700
                  dark:bg-blue-900/30
                  dark:text-blue-300
                "
                >
                  Current
                </span>
              </div>

              <p
                className="
                mt-3
                text-slate-500
              "
              >
                {currentFlight?.origin}
                {" → "}
                {currentFlight?.destination}
              </p>

              <p className="mt-3">
                Departure:{" "}
                {new Date(currentFlight?.departs_at ?? "").toLocaleString()}
              </p>
            </div>
          </div>

          {/* AVAILABLE FLIGHTS */}
          <div>
            <div
              className="
              mb-6 flex
              items-center
              justify-between
            "
            >
              <h2
                className="
                text-2xl
                font-bold
              "
              >
                Available Flights
              </h2>

              <span
                className="
                rounded-full
                bg-blue-100
                px-4 py-2
                text-sm
                font-medium
                text-blue-700
                dark:bg-blue-900/30
                dark:text-blue-300
              "
              >
                {availableFlights.length} Flight(s)
              </span>
            </div>

            <div className="space-y-5">
              {availableFlights.map((flight) => {
                const departure = new Date(flight.departs_at);

                const arrival = new Date(flight.arrives_at);

                const durationMs = arrival.getTime() - departure.getTime();

                const hours = Math.floor(durationMs / (1000 * 60 * 60));

                const minutes = Math.floor(
                  (durationMs % (1000 * 60 * 60)) / (1000 * 60),
                );

                return (
                  <div
                    key={flight.id}
                    className="
                      rounded-[32px]
                      border
                      border-slate-200
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      hover:shadow-lg
                      dark:border-slate-800
                      dark:bg-slate-900
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        gap-6
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                      "
                    >
                      {/* LEFT */}
                      <div className="flex-1">
                        <div
                          className="
                            flex flex-wrap
                            items-center
                            gap-3
                          "
                        >
                          <h3
                            className="
                              text-2xl
                              font-bold
                            "
                          >
                            {flight.flight_no}
                          </h3>

                          <span
                            className="
                              rounded-full
                              bg-green-100
                              px-3 py-1
                              text-sm
                              font-medium
                              text-green-700
                              dark:bg-green-900/30
                              dark:text-green-300
                            "
                          >
                            Scheduled
                          </span>
                        </div>

                        <div
                          className="
                            mt-5 flex
                            flex-wrap
                            gap-8
                          "
                        >
                          <div>
                            <p className="text-sm text-slate-500">Route</p>

                            <p className="font-semibold">
                              {flight.origin}
                              {" → "}
                              {flight.destination}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-slate-500">Departure</p>

                            <p className="font-semibold">
                              {departure.toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-slate-500">Duration</p>

                            <p className="font-semibold">
                              {hours}h {minutes}m
                            </p>
                          </div>
                        </div>

                        {/* CLASSES */}
                        <div className="mt-5">
                          <p
                            className="
                              mb-2
                              text-sm
                              text-slate-500
                            "
                          >
                            Classes
                          </p>

                          <div className="flex gap-2">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                              Economy
                            </span>

                            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                              Business
                            </span>

                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                              First
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        className="
                          flex flex-col
                          gap-4
                          lg:items-end
                        "
                      >
                        <h3
                          className="
                            text-3xl
                            font-bold
                            text-blue-600
                          "
                        >
                          ₹{flight.base_price}
                        </h3>

                        <button
                          onClick={() =>
                            router.push(
                              `/flights/${flight.id}?mode=reschedule&bookingId=${bookingId}`,
                            )
                          }
                          className="
                            rounded-2xl
                            bg-blue-600
                            px-6 py-4
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                          "
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
