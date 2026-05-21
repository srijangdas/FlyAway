"use client";

import Navbar from "@/components/layout/Navbar";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
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
          mx-auto grid
          max-w-6xl gap-8
          lg:grid-cols-[2fr_1fr]
        "
        >
          {/* LEFT */}
          <div
            className="
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
              Payment
            </h1>

            <div className="mt-8 space-y-5">
              <input
                placeholder="Card Holder Name"
                className="
                w-full rounded-2xl
                border p-4
              "
              />

              <input
                placeholder="Card Number"
                className="
                w-full rounded-2xl
                border p-4
              "
              />

              <div
                className="
                grid gap-4
                md:grid-cols-2
              "
              >
                <input
                  placeholder="MM/YY"
                  className="
                  rounded-2xl
                  border p-4
                "
                />

                <input
                  placeholder="CVV"
                  className="
                  rounded-2xl
                  border p-4
                "
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
            sticky top-24
            h-fit rounded-[32px]
            bg-white p-6
            shadow-lg
            dark:bg-slate-900
          "
          >
            <h2
              className="
              text-2xl font-bold
            "
            >
              Fare Summary
            </h2>

            <div
              className="
              mt-6 space-y-4
            "
            >
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹599</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹80</span>
              </div>

              <div
                className="
                flex justify-between
                text-xl font-bold
              "
              >
                <span>Total</span>
                <span>₹679</span>
              </div>
            </div>

            <Link
              href="/booking/confirmation"
              className="
              mt-8 flex w-full
              items-center
              justify-center gap-2
              rounded-2xl
              bg-blue-600 py-4
              font-semibold
              text-white
            "
            >
              <CreditCard />
              Pay Now
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}