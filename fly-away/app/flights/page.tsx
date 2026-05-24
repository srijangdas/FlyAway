import Navbar from "@/components/layout/navbar";
import FlightSearch from "@/components/flight/flight-search";
import FlightCard from "@/components/flight/flight-card";

import { createClient } from "@/lib/supabase/server";

function getMinDepartureTime() {
  const thirtyMinutesFromNow = Date.now() + 30 * 60 * 1000;
  return new Date(thirtyMinutesFromNow).toISOString();
}

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: Promise<{
    from?: string;
    to?: string;
    date?: string;
  }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  let query = supabase.from("flights").select("*").eq("status", "scheduled");

  // FROM
  if (params.from) {
    query = query.eq("origin", params.from);
  }

  // TO
  if (params.to) {
    query = query.eq("destination", params.to);
  }

  //CURR_TIME+30mins
  const minDeparture = getMinDepartureTime();

  // DATE FILTER
  if (params.date) {
    const startOfDay = `${params.date}T00:00:00`;

    const endOfDay = `${params.date}T23:59:59`;

    query = query
      .gte("departs_at", startOfDay)
      .lte("departs_at", endOfDay)
      .gte("departs_at", minDeparture);
  } else {
    query = query.gte("departs_at", minDeparture);
  }

  const { data: flights, error } = await query.order("departs_at", {
    ascending: true,
  });

  console.log(error);

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
          mx-auto
          max-w-7xl
        "
        >
          <FlightSearch />

          <div className="mt-10">
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
                Available Flights
              </h2>

              <span
                className="
                text-slate-500
              "
              >
                {flights?.length ?? 0} Flights
              </span>
            </div>

            {flights?.length === 0 && (
              <div
                className="
                rounded-[32px]
                bg-white p-10
                text-center
                shadow-lg
                dark:bg-slate-900
              "
              >
                <h3
                  className="
                  text-2xl
                  font-bold
                "
                >
                  No flights found
                </h3>

                <p
                  className="
                  mt-2
                  text-slate-500
                "
                >
                  Try changing destination or date.
                </p>
              </div>
            )}

            <div className="space-y-5">
              {flights?.map((flight) => (
                <FlightCard
                  key={flight.id}
                  id={flight.id}
                  airline={flight.flight_no}
                  stops="Non-stop"
                  departureDate={new Date(flight.departs_at).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                  departureTime={new Date(flight.departs_at).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                  arrivalTime={new Date(flight.arrives_at).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                  origin={flight.origin}
                  destination={flight.destination}
                  duration={`${Math.floor(
                    (new Date(flight.arrives_at).getTime() -
                      new Date(flight.departs_at).getTime()) /
                      1000 /
                      60,
                  )} min`}
                  price={flight.base_price}
                  classOptions={[
                    {
                      type: "economy",
                      price: flight.base_price,
                    },
                    {
                      type: "business",
                      price: flight.base_price + 1500,
                    },
                    {
                      type: "first",
                      price: flight.base_price + 3000,
                    },
                  ]}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
