"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Moon, Sun, Menu, X } from "lucide-react";

import { useTheme } from "next-themes";

import LogoutButton from "./logoutButton";

import { useUserStore } from "@/store/user-store";

export default function Navbar() {
  const supabase = createClient();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useUserStore((state) => state.user);

  const setUser = useUserStore((state) => state.setUser);

  const setSessionToken = useUserStore((state) => state.setSessionToken);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(user);

      setSessionToken(session?.access_token ?? null);
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);

      setSessionToken(session?.access_token ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, setUser, setSessionToken]);

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header
      className="
      sticky top-0
      z-50
      border-b
      border-slate-200
      bg-white/90
      backdrop-blur-md
      dark:border-slate-800
      dark:bg-slate-950/90
    "
    >
      <div
        className="
        mx-auto
        flex
        h-20
        max-w-7xl
        items-center
        justify-between
        px-5
      "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
          text-3xl
          font-bold
          text-blue-600
        "
        >
          FlyAway
        </Link>

        {/* Desktop Nav */}
        <nav
          className="
          hidden
          items-center
          gap-8
          md:flex
        "
        >
          <Link href="/">Home</Link>

          <Link href="/flights">Flights</Link>

          {user && <Link href="/my-bookings">My Bookings</Link>}
        </nav>

        {/* Desktop Right */}
        <div
          className="
          hidden
          items-center
          gap-3
          md:flex
        "
        >
          {/* Theme */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
            rounded-full
            border
            p-3
            transition
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
                transition
                hover:bg-blue-700
              "
              >
                Sign Up
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
          rounded-xl
          p-2
          md:hidden
        "
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          md:hidden
          ${
            mobileOpen
              ? "max-h-[500px] border-t border-slate-200 dark:border-slate-800"
              : "max-h-0"
          }
        `}
      >
        <div
          className="
          flex
          flex-col
          gap-3
          bg-white
          px-5
          py-5
          dark:bg-slate-950
        "
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="
            rounded-xl
            px-4 py-3
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          >
            Home
          </Link>

          <Link
            href="/flights"
            onClick={closeMenu}
            className="
            rounded-xl
            px-4 py-3
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          >
            Flights
          </Link>

          {user && (
            <Link
              href="/my-bookings"
              onClick={closeMenu}
              className="
              rounded-xl
              px-4 py-3
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
            >
              My Bookings
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4 py-3
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>

          {!user ? (
            <>
              <Link
                href="/login"
                onClick={closeMenu}
                className="
                rounded-2xl
                border
                py-3
                text-center
                font-medium
              "
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={closeMenu}
                className="
                rounded-2xl
                bg-blue-600
                py-3
                text-center
                font-semibold
                text-white
              "
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div onClick={closeMenu}>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
