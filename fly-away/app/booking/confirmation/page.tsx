import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Page() {
  return (
    <>
      <Navbar />

      <main
        className="
        flex min-h-screen
        items-center
        justify-center
        bg-slate-50 p-6
        dark:bg-slate-950
      "
      >
        <div
          className="
          max-w-xl rounded-[32px]
          bg-white p-10
          text-center shadow-xl
          dark:bg-slate-900
        "
        >
          <CheckCircle2
            className="
            mx-auto text-green-500
          "
            size={80}
          />

          <h1
            className="
            mt-6 text-4xl
            font-bold
          "
          >
            Booking Confirmed
          </h1>

          <p
            className="
            mt-3 text-slate-500
          "
          >
            Your ticket has been booked successfully.
          </p>

          <div
            className="
            mt-8 rounded-2xl
            bg-slate-100 p-6
            dark:bg-slate-800
          "
          >
            <p>PNR: SKY123X</p>
            <p>Seat: 12A</p>
            <p>Status: Confirmed</p>
          </div>

          <Link
            href="/my-bookings"
            className="
            mt-8 inline-block
            rounded-2xl
            bg-blue-600
            px-6 py-4
            text-white
          "
          >
            My Bookings
          </Link>
        </div>
      </main>
    </>
  );
}