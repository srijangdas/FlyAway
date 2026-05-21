"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme }
from "next-themes";

export default function Navbar() {
  const { theme, setTheme } =
    useTheme();

  return (
    <header
      className="
      sticky top-0 z-50
      bg-green
      dark:bg-slate-900
    "
    >
      <div
        className="
        mx-auto flex h-16
        max-w-7xl items-center
        justify-between px-4
      "
      >
        <Link
          href="/"
          className="
          text-xl font-bold
          text-blue-600
        "
        >
          FlyAway
        </Link>

        <nav
          className="
          hidden gap-8
          md:flex
        "
        >
          <Link href="/">
            Home
          </Link>

          <Link href="/flights">
            Flights
          </Link>

          <Link href="/my-bookings">
            My Bookings
          </Link>
        </nav>

        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          className="
          rounded-full border p-2
        "
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>
    </header>
  );
}