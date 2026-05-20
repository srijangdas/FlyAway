import { signUp } from "../actions/auth";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={signUp}
        className="flex w-96 flex-col gap-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">
          Sign Up
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded border p-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded border p-3"
          required
        />

        <button
          className="rounded bg-black p-3 text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}