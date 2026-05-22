import Navbar from "@/components/layout/Navbar";

import SeatMap from "@/components/seat/seat-map";

import { createClient } from "@/lib/supabase/server";

export default async function FlightPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: flight } = await supabase
    .from("flights")
    .select("*")
    .eq("id", id)
    .single();

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
          {/* Flight Info */}
          <div
            className="
            rounded-[32px]
            bg-white p-6
            shadow-lg
            dark:bg-slate-900
          "
          >
            <h1
              className="
              text-4xl
              font-bold
            "
            >
              {flight?.flight_no}
            </h1>

            <div
              className="
              mt-5 flex
              gap-6 text-lg
            "
            >
              <p>{flight?.origin}</p>

              <span>→</span>

              <p>{flight?.destination}</p>

              <p>₹{flight?.base_price}</p>
            </div>
          </div>

          <div className="mt-8">
            <SeatMap flightId={id} basePrice={flight.base_price} />
          </div>
        </div>
      </main>
    </>
  );
}
