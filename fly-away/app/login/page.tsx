"use client";

import Link from "next/link";
import { useState }
from "react";

import { toast }
from "sonner";

import { login }
from "@/app/actions/auth";

import { useRouter }
from "next/navigation";

export default function LoginPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  async function handleLogin(
    e:
      React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const res =
      await login(
        email,
        password
      );

    setLoading(false);

    if (!res.success) {
      toast.error(
        res.message
      );

      return;
    }

    toast.success(
      "Logged in!"
    );

    router.push("/");
  }

  return (
    <main
      className="
      flex min-h-screen
      items-center
      justify-center
      bg-slate-50 p-5
      dark:bg-slate-950
    "
    >
      <form
        onSubmit={
          handleLogin
        }
        className="
        w-full max-w-md
        rounded-[32px]
        bg-white p-8
        shadow-xl
        dark:bg-slate-900
      "
      >
        <h1
          className="
          text-4xl font-bold
        "
        >
          Welcome Back
        </h1>

        <div
          className="
          mt-8 space-y-5
        "
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
            w-full rounded-2xl
            border p-4
          "
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
            w-full rounded-2xl
            border p-4
          "
          />

          <button
            disabled={loading}
            className="
            w-full rounded-2xl
            bg-blue-600
            py-4 font-semibold
            text-white
          "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <p
            className="
            text-center
            text-slate-500
          "
          >
            Don’t have
            an account?{" "}

            <Link
              href="/signup"
              className="
              font-semibold
              text-blue-600
            "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}