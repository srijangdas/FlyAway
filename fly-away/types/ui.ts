import type { Seat } from "./seat";
import type { Booking } from "./booking";
import type { Flight } from "./flight";

export type SeatCardProps = {
  seat: Seat;
  selected: boolean;
  onSelect: () => void;
};

export type SeatMapProps = {
  flightId: string;
  basePrice: number;
};

export type FlightCardClassOption = {
  type: string;
  price: number;
};

export type FlightCardProps = {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stops: string;
  price: number;
  classOptions: FlightCardClassOption[];
};

export type BookingCard = Booking & {
  flight?: Flight;
  seat?: Seat;
};
