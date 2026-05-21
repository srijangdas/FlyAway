"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Moon, Sun }from "lucide-react";
import { useTheme } from "next-themes";
import { logout } from "@/app/actions/auth";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const supabase =
    createClient();

  const [user, setUser] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const { theme, setTheme } =
    useTheme();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(
            session?.user ?? null
          );
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header
      className="
      sticky top-0 z-50
      border-b border-slate-200
      bg-white/90
      backdrop-blur-md
      dark:border-slate-800
      dark:bg-slate-950/90
    "
    >
      <div
        className="
        mx-auto flex
        h-20 max-w-7xl
        items-center
        justify-between
        px-5
      "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
          text-3xl font-bold
          text-blue-600
        "
        >
          FlyAway
        </Link>

        {/* Nav */}
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

          {user && (
            <Link
              href="/my-bookings"
            >
              My Bookings
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div
          className="
          flex items-center
          gap-3
        "
        >
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="
            rounded-full border
            p-3
          "
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {!user ? (
            <>
              <Link
                href="/login"
                className="
                rounded-xl
                px-5 py-3
                font-medium
              "
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="
                rounded-2xl
                bg-blue-600
                px-5 py-3
                font-semibold
                text-white
              "
              >
                Sign Up
              </Link>
            </>
          ) : (
            <LogoutButton/>
          )}
        </div>
      </div>
    </header>
  );
}