export type Seat = {
  id: string;
  flight_id: string;

  seat_number: string;

  class: "economy" | "business" | "first";

  is_available: boolean;

  extra_fee: number;
};
