"use client";

import Navbar from "@/components/layout/Navbar";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { toast } from "sonner";

import { useFlightStore } from "@/store/flight-store";
import type { PassengerForm } from "@/types/passenger";

export default function BookingPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchQuery = useFlightStore((state) => state.searchQuery);
  const selectedFlight = useFlightStore((state) => state.selectedFlight);
  const selectedSeats = useFlightStore((state) => state.selectedSeats);
  const passengerForms = useFlightStore((state) => state.passengerFormData);
  const setPassengerFormData = useFlightStore(
    (state) => state.setPassengerFormData,
  );
  const setBookingStep = useFlightStore((state) => state.setBookingStep);

  const flightId = searchParams?.get("flightId") ?? selectedFlight?.id ?? "";
  const seatId = searchParams?.get("seatId") ?? selectedSeats[0]?.id ?? "";
  const passengers = Number(
    searchParams?.get("passengers") ?? searchQuery.passengers ?? 1,
  );

  useEffect(() => {
    const defaults: PassengerForm[] = Array.from(
      { length: passengers },
      (_, index) =>
        passengerForms[index] ?? {
          fullName: "",
          passportNo: "",
          nationality: "",
          dob: "",
        },
    );

    if (passengerForms.length !== passengers) {
      setPassengerFormData(defaults);
    }
  }, [passengers, passengerForms, setPassengerFormData]);

  function updatePassenger(
    index: number,
    field: keyof PassengerForm,
    value: string,
  ) {
    const updated = [...passengerForms];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setPassengerFormData(updated);
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();

    for (let i = 0; i < passengerForms.length; i++) {
      const p = passengerForms[i];

      if (!p.fullName.trim()) {
        toast.error(`Passenger ${i + 1}: Name required`);

        return;
      }

      if (!p.passportNo.trim()) {
        toast.error(`Passenger ${i + 1}: Passport required`);

        return;
      }

      if (!p.nationality.trim()) {
        toast.error(`Passenger ${i + 1}: Nationality required`);

        return;
      }

      if (!p.dob) {
        toast.error(`Passenger ${i + 1}: DOB required`);

        return;
      }
    }

    setBookingStep("payment");

    router.push(`/payment?flightId=${flightId}&seatId=${seatId}`);
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
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              Passenger Details
            </h1>

            <p
              className="
              mt-2
              text-slate-500
            "
            >
              Fill details for {passengers} passenger(s)
            </p>

            <form
              onSubmit={handleContinue}
              className="
              mt-8
              space-y-10
            "
            >
              {passengerForms.map((passenger, index) => (
                <div
                  key={index}
                  className="
                    rounded-3xl
                    border
                    p-6
                  "
                >
                  <h2
                    className="
                      mb-5
                      text-2xl
                      font-bold
                    "
                  >
                    Passenger {index + 1}
                  </h2>

                  <div className="space-y-5">
                    <input
                      placeholder="Full Name"
                      value={passenger.fullName}
                      onChange={(e) =>
                        updatePassenger(index, "fullName", e.target.value)
                      }
                      className="
                        w-full
                        rounded-2xl
                        border p-4
                      "
                    />

                    <input
                      placeholder="Passport Number"
                      value={passenger.passportNo}
                      onChange={(e) =>
                        updatePassenger(index, "passportNo", e.target.value)
                      }
                      className="
                        w-full
                        rounded-2xl
                        border p-4
                      "
                    />

                    <input
                      placeholder="Nationality"
                      value={passenger.nationality}
                      onChange={(e) =>
                        updatePassenger(index, "nationality", e.target.value)
                      }
                      className="
                        w-full
                        rounded-2xl
                        border p-4
                      "
                    />

                    <input
                      title="Damn"
                      type="date"
                      value={passenger.dob}
                      onChange={(e) =>
                        updatePassenger(index, "dob", e.target.value)
                      }
                      className="
                        w-full
                        rounded-2xl
                        border p-4
                      "
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="
                w-full
                rounded-2xl
                bg-blue-600
                py-5
                text-lg
                font-semibold
                text-white
              "
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
