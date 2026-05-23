"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Clock3, Plane } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useFlightStore } from "@/store/flight-store";

import type { FlightCardProps } from "@/types/ui";

export default function FlightCard({
  id,
  airline,
  departureDate,
  departureTime,
  arrivalTime,
  origin,
  destination,
  duration,
  stops,
  classOptions,
}: FlightCardProps) {
  const router = useRouter();

  const supabase = createClient();
  const setSelectedFlight = useFlightStore((state) => state.setSelectedFlight);
  const setBookingStep = useFlightStore((state) => state.setBookingStep);

  async function handleBooking() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login to continue booking");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }

    setSelectedFlight({
      id,
      flight_no: airline,
      origin,
      destination,
      base_price: classOptions[0]?.price ?? 0,
      departs_at: "",
      arrives_at: "",
    });

    setBookingStep("selectSeat");

    router.push(`/flights/${id}`);
  }

  return (
    <button
      onClick={handleBooking}
      className="
      w-full rounded-[32px]
      border border-slate-200
      bg-white p-5
      text-left shadow-md
      transition-all
      hover:shadow-xl
      dark:border-slate-800
      dark:bg-slate-900
    "
    >
      {/* TOP */}
      <div
        className="
        flex flex-col
        gap-5 lg:flex-row
        lg:items-center
        lg:justify-between
      "
      >
        {/* LEFT */}
        <div
          className="
          flex items-center
          gap-4
        "
        >
          <div
            className="
            flex h-14 w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            dark:bg-slate-800
          "
          >
            <Plane
              className="
              text-blue-600
            "
            />
          </div>

          <div>
            <h2
              className="
              text-xl
              font-bold
            "
            >
              {airline}
            </h2>

            <p
              className="
              text-sm
              text-slate-500
            "
            >
              {stops}
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div
          className="
          flex flex-1
          flex-col items-center
          gap-4 lg:flex-row
          lg:justify-center
        "
        >
          {/* Departure */}
          <div className="text-center">
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              {departureTime}
            </h2>

            <p
              className="
              text-slate-500
            "
            >
              {origin}
            </p>
          </div>

          {/* Plane line */}
          <div
            className="
            flex flex-col
            items-center
            text-slate-500
          "
          >
            <Plane
              className="
              rotate-90
            "
            />

            <span
              className="
              text-sm
            "
            >
              {duration}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              {arrivalTime}
            </h2>

            <p
              className="
              text-slate-500
            "
            >
              {destination}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div
          className="
          flex items-center
          gap-2 font-bold
          text-slate-500
        "
        >
          <h2>{departureDate}</h2>
        </div>
      </div>

      {/* CLASS OPTIONS */}
      <div className="mt-6">
        <p
          className="
          mb-4 text-sm
          text-slate-500
        "
        >
          Available Classes
        </p>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-4">
            {classOptions.map((option) => (
              <div
                key={option.type}
                className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
              >
                <h3 className="font-semibold capitalize">{option.type}</h3>

                <p className="mt-1 text-lg font-bold text-blue-600">
                  ₹{option.price}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="w-full max-w-40 rounded-2xl bg-blue-600 py-2.5 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
