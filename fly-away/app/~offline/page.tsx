export default function OfflinePage() {
  return (
    <main
      className="
      flex min-h-screen
      flex-col
      items-center
      justify-center
      bg-slate-950
      px-4
      text-center
      text-white
    "
    >
      <h1
        className="
        text-5xl
        font-bold
      "
      >
        You&apos;re Offline
      </h1>

      <p
        className="
        mt-4
        text-slate-400
      "
      >
        Internet connection unavailable.
      </p>

      <p
        className="
        mt-2
        text-slate-500
      "
      >
        You can still view cached bookings.
      </p>
    </main>
  );
}
