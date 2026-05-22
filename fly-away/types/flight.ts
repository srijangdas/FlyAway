export type Flight = {
  id: string;

  flight_no: string;

  origin: string;

  destination: string;

  departs_at: string;

  arrives_at: string;

  aircraft_type: string;

  status: "scheduled" | "delayed" | "cancelled";

  base_price: number;

  created_at: string;
};
