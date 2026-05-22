import type { SeatCardProps } from "@/types/ui";

export default function SeatCard({ seat, selected, onSelect }: SeatCardProps) {
  const isBooked = !seat.is_available;

  const color = selected
    ? "bg-blue-600 text-white border-blue-600"
    : isBooked
      ? "bg-red-100 border-red-300 text-red-500 cursor-not-allowed opacity-70"
      : seat.class === "economy"
        ? "bg-green-100 border-green-300 text-black hover:bg-green-200"
        : seat.class === "business"
          ? "bg-purple-100 border-purple-300 text-black hover:bg-purple-200"
          : "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200";

  return (
    <button
      disabled={isBooked}
      onClick={onSelect}
      title={`${seat.class}
• +₹${seat.extra_fee}`}
      className={`
        h-14 w-14
        rounded-2xl
        border text-sm
        font-bold
        transition-all
        active:scale-95
        ${color}
      `}
    >
      {seat.seat_number}
    </button>
  );
}
