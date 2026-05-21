"use client";

import { useState } from "react";
import { Search, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FlightSearch() {
  const router = useRouter();

  const [form, setForm] = useState({
    from: "",
    to: "",
    departureDate: "",
    passengers: 1,
    classType: "economy",
  });

  const handleSearch = () => {
    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
      departureDate:
        form.departureDate,
      passengers:
        form.passengers.toString(),
      class:
        form.classType,
    });

    router.push(
      `/flights?${params.toString()}`
    );
  };

  return (
    <div
      className="
      rounded-[32px]
      bg-white p-6
      shadow-2xl
      dark:bg-slate-900
    "
    >
      <div
        className="
        grid gap-5
        md:grid-cols-2
        lg:grid-cols-3
      "
      >
        {/* FROM */}
        <div>
          <label
            className="
            mb-2 block
            text-sm font-medium
          "
          >
            From
          </label>

          <div
            className="
            flex items-center
            rounded-2xl border
            border-slate-300
            px-4 py-4
            dark:border-slate-700
          "
          >
            <MapPin
              size={20}
              className="mr-2"
            />

            <input
              type="text"
              placeholder="Kolkata"
              className="
              w-full bg-transparent
              outline-none
            "
              value={form.from}
              onChange={(e) =>
                setForm({
                  ...form,
                  from: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* TO */}
        <div>
          <label
            className="
            mb-2 block
            text-sm font-medium
          "
          >
            To
          </label>

          <div
            className="
            flex items-center
            rounded-2xl border
            border-slate-300
            px-4 py-4
            dark:border-slate-700
          "
          >
            <MapPin
              size={20}
              className="mr-2"
            />

            <input
              type="text"
              placeholder="Delhi"
              className="
              w-full bg-transparent
              outline-none
            "
              value={form.to}
              onChange={(e) =>
                setForm({
                  ...form,
                  to: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* DATE */}
        <div>
          <label
            className="
            mb-2 block
            text-sm font-medium
          "
          >
            Departure
          </label>

          <input
            title="flight-depar"
            type="date"
            className="
            w-full rounded-2xl
            border border-slate-300
            bg-transparent
            px-4 py-4
            dark:border-slate-700
          "
            value={
              form.departureDate
            }
            onChange={(e) =>
              setForm({
                ...form,
                departureDate:
                  e.target.value,
              })
            }
          />
        </div>

        {/* PASSENGERS */}
        <div>
          <label
            className="
            mb-2 block
            text-sm font-medium
          "
          >
            Passengers
          </label>

          <div
            className="
            flex items-center
            rounded-2xl border
            border-slate-300
            px-4 py-4
            dark:border-slate-700
          "
          >
            <Users
              size={20}
              className="mr-2"
            />

            <select
            title="flight-passengers"
              className="
              w-full bg-transparent
              outline-none
            "
              value={
                form.passengers
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  passengers:
                    Number(
                      e.target.value
                    ),
                })
              }
            >
              {[1,2,3,4,5].map(
                (n) => (
                  <option
                    key={n}
                    value={n}
                  >
                    {n} Passenger
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* CLASS */}
        <div>
          <label
            className="
            mb-2 block
            text-sm font-medium
          "
          >
            Class
          </label>

          <select
            title="flight-class"
            className="
            w-full rounded-2xl
            border border-slate-300
            bg-transparent
            px-4 py-4
            dark:border-slate-700
          "
            value={
              form.classType
            }
            onChange={(e) =>
              setForm({
                ...form,
                classType:
                  e.target.value,
              })
            }
          >
            <option value="economy">
              Economy
            </option>

            <option value="business">
              Business
            </option>

            <option value="first">
              First Class
            </option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="
        mt-6 flex w-full
        items-center
        justify-center gap-2
        rounded-2xl
        bg-blue-600 py-5
        text-lg font-semibold
        text-white
        transition hover:bg-blue-700
      "
      >
        <Search size={22} />
        Search Flights
      </button>
    </div>
  );
}