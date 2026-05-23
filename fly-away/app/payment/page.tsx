"use client";

import Navbar from "@/components/layout/navbar";

import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { useFlightStore } from "@/store/flight-store";
import { Seat } from "@/types/seat";

function PaymentContent() {
  const router = useRouter();

  const supabase = createClient();

  const searchParams = useSearchParams();

  const selectedFlight = useFlightStore((state) => state.selectedFlight);
  const selectedSeats = useFlightStore((state) => state.selectedSeats);
  const passengerForms = useFlightStore((state) => state.passengerFormData);
  const resetBooking = useFlightStore((state) => state.resetBooking);

  const flightId = searchParams.get("flightId") ?? selectedFlight?.id;
  const seatId = searchParams.get("seatId") ?? selectedSeats[0]?.id;

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
  }, [flightId, seatId, supabase]);

  async function handlePayment() {
    try {
      setLoading(true);

      const response = await fetch("/api/book-flight", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          flightId,
          seatId,
          passengerData: passengerForms,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);

        return;
      }

      toast.success("Payment Successful");

      resetBooking();
      router.push(`/booking/confirmation?pnr=${result.pnr}`);
    } catch (error) {
      console.error(error);

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

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div
          className="
          flex min-h-screen
          items-center
          justify-center
        "
        >
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
