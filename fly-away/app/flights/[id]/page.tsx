import Navbar from "@/components/layout/navbar";
import SeatMap from "@/components/seat/seat-map";

import { createClient } from "@/lib/supabase/server";

export default async function FlightPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    mode?: string;
    bookingId?: string;
  }>;
}) {
  const { id } = await params;

  const { mode, bookingId } = await searchParams;

  const isReschedule = mode === "reschedule";

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
          {/* FLIGHT INFO */}
          <div
            className="
            rounded-[32px]
            bg-white
            p-6
            shadow-lg
            dark:bg-slate-900
          "
          >
            <div
              className="
              flex flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
            >
              <div>
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
                  flex-wrap
                  items-center
                  gap-6
                  text-lg
                "
                >
                  <p>{flight?.origin}</p>

                  <span>→</span>

                  <p>{flight?.destination}</p>

                  <p
                    className="
                    font-semibold
                    text-blue-600
                  "
                  >
                    ₹{flight?.base_price}
                  </p>
                </div>
              </div>

              {isReschedule && (
                <div
                  className="
                  rounded-2xl
                  bg-orange-100
                  px-5 py-3
                  text-sm
                  font-medium
                  text-orange-700
                  dark:bg-orange-900/30
                  dark:text-orange-300
                "
                >
                  Reschedule Mode
                </div>
              )}
            </div>
          </div>

          {/* SEAT MAP */}
          <div className="mt-8">
            <SeatMap
              flightId={id}
              basePrice={flight?.base_price ?? 0}
              isReschedule={isReschedule}
              bookingId={bookingId}
            />
          </div>
        </div>
      </main>
    </>
  );
}
