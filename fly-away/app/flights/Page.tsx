import Navbar from "@/components/layout/Navbar";
import FlightSearch from "@/components/flight/flight-search";
import FlightCard from "@/components/flight/flight-card";

export default function FlightsPage() {
  const flights = [
    {
      id: 1,
      airline: "SkyAir",
      stops: "Non-stop",
      departureTime: "08:00 AM",
      arrivalTime: "12:30 PM",
      origin: "JFK",
      destination: "LHR",
      duration: "7h 30m",
      price: 599,
    },
    {
      id: 2,
      airline: "Global Wings",
      stops: "1 Stop",
      departureTime: "10:30 AM",
      arrivalTime: "03:45 PM",
      origin: "JFK",
      destination: "LHR",
      duration: "8h 15m",
      price: 449,
    },
    {
      id: 3,
      airline: "CloudLine",
      stops: "Non-stop",
      departureTime: "02:00 PM",
      arrivalTime: "07:00 PM",
      origin: "JFK",
      destination: "LHR",
      duration: "7h 00m",
      price: 689,
    },
  ];

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-slate-50
          px-4 py-8
          transition-colors
          dark:bg-slate-950
          md:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mb-8">
            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
              "
            >
              Find Flights
            </h1>

            <p
              className="
                mt-2
                text-slate-500
                dark:text-slate-400
              "
            >
              Search and compare flights
              at the best prices.
            </p>
          </div>

          {/* SEARCH BAR */}
          <section className="mb-10">
            <FlightSearch />
          </section>

          {/* TOP BAR */}
          <div
            className="
              mb-6 flex
              flex-wrap items-center
              justify-between gap-4
            "
          >
            <div>
              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Available Flights
              </h2>

              <p
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {flights.length} flights found
              </p>
            </div>

            <select
              title="flight-price"
              className="
                rounded-2xl
                border border-slate-300
                bg-white
                px-4 py-3
                outline-none
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <option>
                Sort by Price
              </option>
              <option>
                Sort by Duration
              </option>
              <option>
                Earliest Departure
              </option>
            </select>
          </div>

          {/* FLIGHT CARDS */}
          <section
            className="
              flex flex-col
              gap-5
            "
          >
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                {...flight}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}