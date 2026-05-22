"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import SeatCard from "./seat-card";

import { createClient } from "@/lib/supabase/client";

import type { Seat } from "@/types/seat";
import type { SeatMapProps } from "@/types/ui";

import { toast } from "sonner";

export default function SeatMap({ flightId, basePrice }: SeatMapProps) {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const [passengers, setPassengers] = useState(1);

  const [seats, setSeats] = useState<Seat[]>([]);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // FETCH SEATS
  useEffect(() => {
    async function fetchSeats() {
      const { data, error } = await supabase
        .from("seats")
        .select("*")
        .eq("flight_id", flightId)
        .order("seat_number");

      console.log(error);

      setSeats(data ?? []);

      setLoading(false);
    }

    fetchSeats();

    // REALTIME
    const channel = supabase
      .channel("seat-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "seats",
        },
        (payload) => {
          const updatedSeat = payload.new as Seat;

          setSeats((current) =>
            current.map((seat) =>
              seat.id === updatedSeat.id ? updatedSeat : seat,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [flightId]);

  // GROUP SEATS
  const groupedSeats = useMemo(() => {
    return {
      first: seats.filter((s) => s.class === "first"),

      business: seats.filter((s) => s.class === "business"),

      economy: seats.filter((s) => s.class === "economy"),
    };
  }, [seats]);

  // SELECT SEAT
  function toggleSeat(seat: Seat) {
    const exists = selectedSeats.find((s) => s.id === seat.id);

    if (exists) {
      setSelectedSeats((current) => current.filter((s) => s.id !== seat.id));

      return;
    }

    if (selectedSeats.length >= passengers) {
      toast.error(`Only ${passengers} seat(s) allowed`);

      return;
    }

    setSelectedSeats((current) => [...current, seat]);
  }

  // TOTAL
  const total =
    passengers * basePrice +
    selectedSeats.reduce((sum, seat) => sum + seat.extra_fee, 0);

  function renderSeats(seatGroup: Seat[]) {
    return (
      <div
        className="
        grid min-w-[420px]
        grid-cols-6
        gap-3
      "
      >
        {seatGroup.map((seat) => (
          <SeatCard
            key={seat.id}
            seat={seat}
            selected={selectedSeats.some((s) => s.id === seat.id)}
            onSelect={() => toggleSeat(seat)}
          />
        ))}
      </div>
    );
  }

  if (loading) {
    return <div>Loading seats...</div>;
  }

  return (
    <div
      className="
      grid gap-8
      lg:grid-cols-[1fr_350px]
    "
    >
      {/* LEFT */}
      <div
        className="
        rounded-[32px]
        bg-white p-6
        shadow-lg
        dark:bg-slate-900
      "
      >
        <div
          className="
          flex flex-col
          gap-5 md:flex-row
          md:items-center
          md:justify-between
        "
        >
          <div>
            <h2
              className="
              text-3xl
              font-bold
            "
            >
              Select Seats
            </h2>

            <p
              className="
              mt-2
              text-slate-500
            "
            >
              Choose seats for passengers.
            </p>
          </div>

          {/* PASSENGERS */}
          <div>
            <label
              className="
              mb-2 block
              text-sm
              font-medium
            "
            >
              Passengers
            </label>

            <select
              title="pass"
              value={passengers}
              onChange={(e) => {
                setPassengers(Number(e.target.value));

                setSelectedSeats([]);
              }}
              className="
              rounded-2xl
              border px-4 py-3
              dark:bg-slate-900
            "
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LEGEND */}
        <div
          className="
          mt-6 flex
          flex-wrap gap-4
          text-sm
        "
        >
          <p>🟢 Economy</p>

          <p>🟣 Business</p>

          <p>🟡 First</p>

          <p>🔴 Occupied</p>

          <p>🔵 Selected</p>
        </div>

        {/* SCROLLABLE CABIN */}
        <div
          className="
          mt-8 overflow-x-auto
        "
        >
          {/* FIRST */}
          <section>
            <h3
              className="
              mb-4 text-xl
              font-bold
              text-yellow-600
            "
            >
              First Class
            </h3>

            {renderSeats(groupedSeats.first)}
          </section>

          {/* BUSINESS */}
          <section className="mt-10">
            <h3
              className="
              mb-4 text-xl
              font-bold
              text-purple-600
            "
            >
              Business
            </h3>

            {renderSeats(groupedSeats.business)}
          </section>

          {/* ECONOMY */}
          <section className="mt-10">
            <h3
              className="
              mb-4 text-xl
              font-bold
              text-green-600
            "
            >
              Economy
            </h3>

            {renderSeats(groupedSeats.economy)}
          </section>
        </div>
      </div>

      {/* RIGHT SUMMARY */}
      <div
        className="
        h-fit rounded-[32px]
        bg-white p-6
        shadow-lg
        dark:bg-slate-900
        lg:sticky lg:top-24
      "
      >
        <h2
          className="
          text-2xl
          font-bold
        "
        >
          Booking Summary
        </h2>

        <div
          className="
          mt-6 space-y-4
        "
        >
          <div
            className="
            flex justify-between
          "
          >
            <span>Passengers</span>

            <span>{passengers}</span>
          </div>

          <div
            className="
            flex justify-between
          "
          >
            <span>Selected Seats</span>

            <span>{selectedSeats.length}</span>
          </div>

          <div>
            <p
              className="
              mb-2
              text-sm
              text-slate-500
            "
            >
              Seats
            </p>

            <div
              className="
              flex flex-wrap gap-2
            "
            >
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="
                    rounded-xl
                    bg-blue-100
                    px-3 py-2
                    text-sm
                    font-medium
                    text-blue-700
                  "
                >
                  {seat.seat_number}
                </div>
              ))}
            </div>
          </div>

          <div
            className="
            border-t pt-5
          "
          >
            <div
              className="
              flex justify-between
              text-xl
              font-bold
            "
            >
              <span>Total</span>

              <span>₹{total}</span>
            </div>
          </div>

          <button
            disabled={selectedSeats.length !== passengers}
            onClick={() =>
              router.push(
                `/booking?flightId=${flightId}&seatId=${selectedSeats[0]?.id}&passengers=${passengers}`,
              )
            }
            className="
            mt-4 w-full
            rounded-2xl
            bg-blue-600 py-5
            font-semibold
            text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
}
