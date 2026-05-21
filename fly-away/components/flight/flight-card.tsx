"use client";

import { Clock3, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type FlightCardProps = {
  id: number;
  airline: string;
  stops: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  price: number;
};

export default function FlightCard({
  id,
  airline,
  stops,
  departureTime,
  arrivalTime,
  origin,
  destination,
  duration,
  price,
}: FlightCardProps) {
  const supabase = createClient();
  const router = useRouter();

  async function handleClick() {
  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    toast.error(
      "Please login to continue booking"
    );

    setTimeout(() => {
      router.push("/login");
    }, 1200);

    return;
  }

  router.push(
    `/flights/${id}`
  );
}

  return (
    <button
      onClick={handleClick}
      className="
      group w-full
      rounded-[32px]
      border border-slate-200
      bg-white p-6
      shadow-sm transition-all
      hover:scale-[1.01]
      hover:shadow-xl
      dark:border-slate-800
      dark:bg-slate-900
    "
    >
      <div
        className="
        flex flex-col gap-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
      >
        {/* LEFT */}
        <div
          className="
          flex items-center gap-4
          lg:w-[220px]
        "
        >
          <div
            className="
            flex h-14 w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-600
            dark:bg-slate-800
          "
          >
            <Plane size={28} />
          </div>

          <div className="text-left">
            <h3
              className="
              text-xl font-bold
            "
            >
              {airline}
            </h3>

            <p
              className="
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
          items-center gap-4
        "
        >
          {/* Departure */}
          <div className="text-left">
            <h2
              className="
              text-2xl font-bold
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

          {/* Line */}
          <div
            className="
            relative hidden
            flex-1 items-center
            lg:flex
          "
          >
            <div
              className="
              h-[2px] w-full
              bg-slate-300
              dark:bg-slate-700
            "
            />

            <div
              className="
              absolute left-1/2
              flex h-10 w-10
              -translate-x-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-slate-500
              dark:bg-slate-900
            "
            >
              <Plane
                size={20}
                className="rotate-90"
              />
            </div>
          </div>

          {/* Arrival */}
          <div className="text-left">
            <h2
              className="
              text-2xl font-bold
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

        {/* DURATION */}
        <div
          className="
          flex items-center gap-2
          text-slate-500
        "
        >
          <Clock3 size={20} />

          <span
            className="
            text-lg
          "
          >
            {duration}
          </span>
        </div>

        {/* PRICE */}
        <div
          className="
          text-left lg:text-right
        "
        >
          <p
            className="
            text-sm text-slate-500
          "
          >
            from
          </p>

          <h2
            className="
            text-3xl font-bold
            text-blue-600
          "
          >
            ₹{price}
          </h2>

          <div
            className="
            mt-3 rounded-2xl
            bg-blue-600
            px-5 py-3
            text-center
            font-medium
            text-white
            transition
            group-hover:bg-blue-700
          "
          >
            View Details
          </div>
        </div>
      </div>
    </button>
  );
}