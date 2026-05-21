import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-slate-50 p-6
        dark:bg-slate-950
      "
      >
        <div
          className="
          mx-auto max-w-4xl
          rounded-[32px]
          bg-white p-8
          shadow-lg
          dark:bg-slate-900
        "
        >
          <h1
            className="
            text-4xl font-bold
            "
          >
            Booking Details
          </h1>

          <div className="mt-8 space-y-3">
            <p>PNR: SKY123</p>
            <p>Status: Confirmed</p>
            <p>Seat: 12A</p>
          </div>

          <div
            className="
            mt-8 flex gap-4
          "
          >
            <Link
              href={`/my-bookings/1/reschedule`}
              className="
              rounded-2xl
              bg-yellow-500
              px-6 py-4
              text-white
            "
            >
              Reschedule
            </Link>

            <button
              className="
              rounded-2xl
              bg-red-500
              px-6 py-4
              text-white
            "
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </main>
    </>
  );
}