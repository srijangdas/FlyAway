"use client";

import Navbar from "@/components/layout/Navbar";
import {
  ArrowRight,
  Clock3,
  Plane,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function FlightDetailPage() {
  const [selectedSeat, setSelectedSeat] =
    useState<number | null>(null);

  const bookedSeats = [
    3, 7, 8, 13, 16, 22,
  ];

  const seats = Array.from(
    { length: 36 },
    (_, i) => i + 1
  );

  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-slate-50
        px-4 py-8
        dark:bg-slate-950
      "
      >
        <div
          className="
          mx-auto grid
          max-w-7xl gap-8
          lg:grid-cols-[2fr_1fr]
        "
        >
          {/* LEFT SIDE */}
          <div>
            {/* Flight Card */}
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
                gap-6 lg:flex-row
                lg:items-center
                lg:justify-between
              "
              >
                <div>
                  <p
                    className="
                    text-lg
                    font-semibold
                  "
                  >
                    SkyAir • AI-203
                  </p>

                  <p
                    className="
                    text-slate-500
                  "
                  >
                    Non-stop
                  </p>
                </div>

                <div
                  className="
                  flex items-center
                  gap-5
                "
                >
                  <div>
                    <h2
                      className="
                      text-2xl
                      font-bold
                    "
                    >
                      08:00 AM
                    </h2>

                    <p
                      className="
                      text-slate-500
                    "
                    >
                      JFK
                    </p>
                  </div>

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
                      7h 30m
                    </span>
                  </div>

                  <div>
                    <h2
                      className="
                      text-2xl
                      font-bold
                    "
                    >
                      12:30 PM
                    </h2>

                    <p
                      className="
                      text-slate-500
                    "
                    >
                      LHR
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Selection */}
            <div
              className="
              mt-8 rounded-[32px]
              bg-white p-6
              shadow-lg
              dark:bg-slate-900
            "
            >
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
                  Select Your Seat
                </h2>

                {/* Legend */}
                <div
                  className="
                  flex flex-wrap
                  gap-4 text-sm
                "
                >
                  <div
                    className="
                    flex items-center
                    gap-2
                  "
                  >
                    <div
                      className="
                      h-4 w-4
                      rounded bg-slate-200
                    "
                    />
                    Available
                  </div>

                  <div
                    className="
                    flex items-center
                    gap-2
                  "
                  >
                    <div
                      className="
                      h-4 w-4
                      rounded bg-blue-600
                    "
                    />
                    Selected
                  </div>

                  <div
                    className="
                    flex items-center
                    gap-2
                  "
                  >
                    <div
                      className="
                      h-4 w-4
                      rounded bg-red-500
                    "
                    />
                    Booked
                  </div>
                </div>
              </div>

              {/* Seat Grid */}
              <div
                className="
                mx-auto max-w-lg
              "
              >
                <div
                  className="
                  grid grid-cols-6
                  gap-4
                "
                >
                  {seats.map(
                    (seat) => {
                      const isBooked =
                        bookedSeats.includes(
                          seat
                        );

                      const isSelected =
                        selectedSeat ===
                        seat;

                      return (
                        <button
                          key={seat}
                          disabled={
                            isBooked
                          }
                          onClick={() =>
                            setSelectedSeat(
                              seat
                            )
                          }
                          className={`
                            h-14 rounded-2xl
                            font-semibold
                            transition-all
                            ${
                              isBooked
                                ? "bg-red-500 text-white cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-600 text-white scale-105"
                                : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800"
                            }
                          `}
                        >
                          {seat}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div
              className="
              sticky top-24
              rounded-[32px]
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
                  <span>
                    Airline
                  </span>

                  <span>
                    SkyAir
                  </span>
                </div>

                <div
                  className="
                  flex justify-between
                "
                >
                  <span>
                    Duration
                  </span>

                  <span>
                    7h 30m
                  </span>
                </div>

                <div
                  className="
                  flex justify-between
                "
                >
                  <span>
                    Seat
                  </span>

                  <span>
                    {selectedSeat ??
                      "--"}
                  </span>
                </div>

                <div
                  className="
                  flex justify-between
                  text-xl font-bold
                "
                >
                  <span>
                    Total
                  </span>

                  <span>
                    ₹599
                  </span>
                </div>
              </div>

              <Link
                href="/payment"
                className={`
                  mt-8 flex
                  w-full items-center
                  justify-center gap-2
                  rounded-2xl
                  py-4 font-semibold
                  text-white transition
                  ${
                    selectedSeat
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-400 pointer-events-none"
                  }
                `}
              >
                Continue Booking
                <ArrowRight
                  size={18}
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}