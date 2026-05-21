"use client";

import Navbar from "@/components/layout/Navbar";
import {
  Clock3,
  Plane,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ReschedulePage() {
  const [selectedFlight, setSelectedFlight] =
    useState<number | null>(null);

  const alternativeFlights = [
    {
      id: 1,
      airline: "SkyAir",
      departure: "10:00 AM",
      arrival: "05:00 PM",
      duration: "7h",
      price: 649,
    },
    {
      id: 2,
      airline: "Global Wings",
      departure: "01:30 PM",
      arrival: "08:30 PM",
      duration: "7h",
      price: 720,
    },
    {
      id: 3,
      airline: "CloudLine",
      departure: "06:00 PM",
      arrival: "01:00 AM",
      duration: "7h",
      price: 550,
    },
  ];

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
        <div className="mx-auto max-w-7xl">
          {/* PAGE HEADER */}
          <div className="mb-8">
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
              mt-2 text-slate-500
              dark:text-slate-400
            "
            >
              Choose another flight
              for the same route.
            </p>
          </div>

          {/* CURRENT BOOKING */}
          <div
            className="
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
              Current Booking
            </h2>

            <div
              className="
              mt-5 flex
              flex-col gap-5
              lg:flex-row
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
                  JFK → LHR
                </p>
              </div>

              <div
                className="
                flex items-center
                gap-6
              "
              >
                <div>
                  <h3
                    className="
                    text-xl
                    font-bold
                  "
                  >
                    08:00 AM
                  </h3>

                  <p>JFK</p>
                </div>

                <Plane
                  className="
                  rotate-90
                  text-slate-400
                "
                />

                <div>
                  <h3
                    className="
                    text-xl
                    font-bold
                  "
                  >
                    03:00 PM
                  </h3>

                  <p>LHR</p>
                </div>
              </div>
            </div>
          </div>

          {/* ALTERNATIVE FLIGHTS */}
          <div className="mt-10">
            <h2
              className="
              mb-5 text-2xl
              font-bold
            "
            >
              Available Flights
            </h2>

            <div className="space-y-5">
              {alternativeFlights.map(
                (flight) => {
                  const selected =
                    selectedFlight ===
                    flight.id;

                  return (
                    <button
                      key={flight.id}
                      onClick={() =>
                        setSelectedFlight(
                          flight.id
                        )
                      }
                      className={`
                        w-full rounded-[32px]
                        border p-6
                        text-left
                        transition-all
                        ${
                          selected
                            ? "border-blue-600 bg-blue-50 dark:bg-slate-800"
                            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                        }
                      `}
                    >
                      <div
                        className="
                        flex flex-col
                        gap-6 lg:flex-row
                        lg:items-center
                        lg:justify-between
                      "
                      >
                        {/* Airline */}
                        <div>
                          <h3
                            className="
                            text-xl
                            font-bold
                          "
                          >
                            {
                              flight.airline
                            }
                          </h3>

                          <p
                            className="
                            text-slate-500
                          "
                          >
                            Non-stop
                          </p>
                        </div>

                        {/* Time */}
                        <div
                          className="
                          flex items-center
                          gap-6
                        "
                        >
                          <div>
                            <h2
                              className="
                              text-2xl
                              font-bold
                            "
                            >
                              {
                                flight.departure
                              }
                            </h2>

                            <p>JFK</p>
                          </div>

                          <div
                            className="
                            flex flex-col
                            items-center
                            text-slate-500
                          "
                          >
                            <Clock3
                              size={18}
                            />

                            <span>
                              {
                                flight.duration
                              }
                            </span>
                          </div>

                          <div>
                            <h2
                              className="
                              text-2xl
                              font-bold
                            "
                            >
                              {
                                flight.arrival
                              }
                            </h2>

                            <p>LHR</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div
                          className="
                          text-left
                          lg:text-right
                        "
                        >
                          <p
                            className="
                            text-sm
                            text-slate-500
                          "
                          >
                            Difference
                          </p>

                          <h2
                            className="
                            text-2xl
                            font-bold
                            text-blue-600
                          "
                          >
                            +₹
                            {
                              flight.price
                            }
                          </h2>
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/my-bookings"
              className={`
                inline-flex
                items-center
                justify-center
                rounded-2xl
                px-8 py-4
                font-semibold
                text-white
                transition
                ${
                  selectedFlight
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "pointer-events-none bg-slate-400"
                }
              `}
            >
              Confirm Reschedule
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}