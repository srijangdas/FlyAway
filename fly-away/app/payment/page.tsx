"use client";

import Navbar from "@/components/layout/Navbar";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Seat } from "@/types/seat";

export default function PaymentPage() {
  const router = useRouter();

  const supabase = createClient();

  const searchParams = useSearchParams();

  const flightId = searchParams.get("flightId");

  const seatId = searchParams.get("seatId");

  const fullName = searchParams.get("fullName");

  const passportNo = searchParams.get("passportNo");

  const nationality = searchParams.get("nationality");

  const dob = searchParams.get("dob");

  const [loading, setLoading] = useState(false);

  const [flight, setFlight] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [seat, setSeat] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  useEffect(() => {
    async function loadData() {
      if (!flightId || !seatId) return;

      const { data: flightData } = await supabase
        .from("flights")
        .select("*")
        .eq("id", flightId)
        .single();

      const { data: seatData } = await supabase
        .from("seats")
        .select("*")
        .eq("id", seatId)
        .single();

      setFlight(flightData);

      setSeat(seatData);
    }

    loadData();
  }, []);

  async function handlePayment() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login");

        return;
      }

      // CHECK SEAT STILL AVAILABLE
      const { data: latestSeat } = await supabase
        .from("seats")
        .select("*")
        .eq("id", seatId)
        .single();

      if (!latestSeat?.is_available) {
        toast.error("Seat already booked");

        router.push(`/flights/${flightId}`);

        return;
      }

      // GENERATE PNR
      const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();

      const totalPrice = flight.base_price + seat.extra_fee;

      // CREATE BOOKING
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,

          flight_id: flightId,

          seat_id: seatId,

          total_price: totalPrice,

          pnr_code: pnr,
        })
        .select()
        .single();

      if (bookingError) {
        console.log(bookingError);

        toast.error("Booking failed");

        return;
      }

      // SAVE PASSENGER
      await supabase.from("passengers").insert({
        booking_id: booking.id,

        full_name: fullName,

        passport_no: passportNo,

        nationality: nationality,

        dob: dob,
      });

      // LOCK SEAT
      await supabase
        .from("seats")
        .update({
          is_available: false,
        })
        .eq("id", seatId);

      toast.success("Payment Successful");

      router.push(`/booking/confirmation?pnr=${pnr}`);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!flight || !seat) {
    return (
      <main
        className="
      flex min-h-screen
      items-center
      justify-center
      bg-slate-50
      dark:bg-slate-950
    "
      >
        <div
          className="
        rounded-3xl
        bg-white
        p-8
        text-center
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
            Wait, Loading
          </h2>

          <p
            className="
          mt-2
          text-slate-500
        "
          >
            If it is stuck here, try again
          </p>
        </div>
      </main>
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
          max-w-3xl
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
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              Payment
            </h1>

            <div
              className="
              mt-8
              space-y-4
            "
            >
              <div
                className="
                flex
                justify-between
              "
              >
                <span>Flight</span>

                <span>{flight.flight_no}</span>
              </div>

              <div
                className="
                flex
                justify-between
              "
              >
                <span>Seat</span>

                <span>{seat.seat_number}</span>
              </div>

              <div
                className="
                flex
                justify-between
              "
              >
                <span>Class</span>

                <span>{seat.class}</span>
              </div>

              <div
                className="
                flex
                justify-between
                border-t
                pt-5
                text-xl
                font-bold
              "
              >
                <span>Total</span>

                <span>₹{flight.base_price + seat.extra_fee}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="
              mt-8
              w-full
              rounded-2xl
              bg-green-600
              py-5
              text-lg
              font-semibold
              text-white
              disabled:opacity-60
            "
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
