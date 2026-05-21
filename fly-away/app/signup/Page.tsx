"use client";

import Link from "next/link";
import { useState }
from "react";

import { toast }
from "sonner";

import { useRouter }
from "next/navigation";

import { signUp }
from "@/app/actions/auth";

export default function SignupPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
      confirmPassword:
        "",
    });

  async function handleSignup(
    e:
      React.FormEvent
  ) {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    if (
      form.password.length < 6
    ) {
      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    setLoading(true);

    const res =
      await signUp(
        form.email,
        form.password
      );

    setLoading(false);

    if (!res.success) {
      toast.error(
        res.message
      );

      return;
    }

    toast.success(
      "Account created!"
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
          handleSignup
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
          Create Account
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
            value={
              form.email
            }
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
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
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            className="
            w-full rounded-2xl
            border p-4
          "
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={
              form.confirmPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value,
              })
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
              ? "Creating..."
              : "Sign Up"}
          </button>

          <p
            className="
            text-center
            text-slate-500
          "
          >
            Already have
            an account?{" "}

            <Link
              href="/login"
              className="
              font-semibold
              text-blue-600
            "
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}