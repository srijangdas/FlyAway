"use client";

import Navbar from "@/components/layout/Navbar";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Booking } from "@/types/booking";
import { Flight } from "@/types/flight";
import { Seat } from "@/types/seat";
import { Passenger } from "@/types/passenger";
import { toast } from "sonner";
import router from "next/router";
import { useFlightStore } from "@/store/flight-store";

export default function BookingDetailsPage() {
  const supabase = createClient();

  const params = useParams();

  const id = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);

  const [flight, setFlight] = useState<Flight | null>(null);

  const [seat, setSeat] = useState<Seat | null>(null);

  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const [loading, setLoading] = useState(true);
  const resetBooking = useFlightStore((state) => state.resetBooking);

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    const { error } = await supabase.rpc("cancel_booking", {
      p_booking_id: booking?.id,
    });

    if (error) {
      toast.error(error.message);

      return;
    }

    resetBooking();
    toast.success("Booking cancelled");

    router.push("/my-bookings");
  }

  useEffect(() => {
    async function loadTicket() {
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();

      if (!bookingData) {
        setLoading(false);

        return;
      }

      setBooking(bookingData);

      const { data: flightData } = await supabase
        .from("flights")
        .select("*")
        .eq("id", bookingData.flight_id)
        .single();

      setFlight(flightData);

      const { data: seatData } = await supabase
        .from("seats")
        .select("*")
        .eq("id", bookingData.seat_id)
        .single();

      setSeat(seatData);

      const { data: passengerData } = await supabase
        .from("passengers")
        .select("*")
        .eq("booking_id", bookingData.id);

      setPassengers(passengerData ?? []);

      setLoading(false);
    }

    loadTicket();
  }, [id]);

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

  if (!booking) {
    return (
      <div
        className="
        flex min-h-screen
        items-center
        justify-center
      "
      >
        Booking not found
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
            <div className="text-center">
              <div
                className="
                text-5xl
              "
              >
                ✈️
              </div>

              <h1
                className="
                mt-4
                text-4xl
                font-bold
              "
              >
                Flight Ticket
              </h1>

              <p
                className="
                mt-2
                text-slate-500
              "
              >
                PNR: {booking.pnr_code}
              </p>
            </div>

            <div
              className="
              mt-10 grid
              gap-6
              md:grid-cols-2
            "
            >
              <div>
                <h2
                  className="
                  text-xl
                  font-bold
                "
                >
                  Flight Details
                </h2>

                <div className="mt-4 space-y-3">
                  <p>Flight: {flight?.flight_no}</p>

                  <p>
                    Route: {flight?.origin}→{flight?.destination}
                  </p>

                  <p>Seat: {seat?.seat_number}</p>

                  <p>Class: {seat?.class}</p>
                </div>
              </div>

              <div>
                <h2
                  className="
                  text-xl
                  font-bold
                "
                >
                  Passengers
                </h2>

                <div className="mt-4 space-y-4">
                  {passengers.map((p, index) => (
                    <div
                      key={p.id}
                      className="
                        rounded-2xl
                        border
                        p-4
                      "
                    >
                      <p>Passenger {index + 1}</p>

                      <p>{p.full_name}</p>

                      <p>{p.passport_no}</p>

                      <p>{p.nationality}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="
              mt-8
              flex justify-between
              border-t
              pt-6
              text-2xl
              font-bold
            "
            >
              <span>Total Paid</span>

              <span>₹{booking.total_price}</span>
            </div>
            <button
              onClick={handleCancel}
              className="
                        rounded-2xl
                        bg-red-600
                        px-5 py-3
                        my-5
                        text-white
                      "
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
