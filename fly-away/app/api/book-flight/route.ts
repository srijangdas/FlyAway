import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { flightId, seatId, passengerData } = body;

    // USER
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // LOCK SEAT
    const { data: seatLocked, error: lockError } = await supabase.rpc(
      "lock_seat",
      {
        p_seat_id: seatId,
      },
    );

    if (lockError || !seatLocked) {
      return NextResponse.json(
        {
          error: "Seat already booked, please choose another seat",
        },
        {
          status: 400,
        },
      );
    }

    // FLIGHT
    const { data: flight, error: flightError } = await supabase
      .from("flights")
      .select("*")
      .eq("id", flightId)
      .single();

    if (flightError || !flight) {
      return NextResponse.json(
        {
          error: "Flight not found",
        },
        {
          status: 404,
        },
      );
    }

    // SEAT
    const { data: seat, error: seatError } = await supabase
      .from("seats")
      .select("*")
      .eq("id", seatId)
      .single();

    if (seatError || !seat) {
      return NextResponse.json(
        {
          error: "Seat not found",
        },
        {
          status: 404,
        },
      );
    }

    // PNR
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();

    const totalPrice = flight.base_price + seat.extra_fee;

    // CREATE BOOKING
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,

        flight_id: flightId,

        seat_id: seatId,

        total_price: totalPrice,

        pnr_code: pnr,
      })
      .select()
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        {
          error: "Booking failed",
        },
        {
          status: 400,
        },
      );
    }

    // PASSENGERS
    const passengers = passengerData.map(
      (passenger: {
        fullName: string;
        passportNo: string;
        nationality: string;
        dob: string;
      }) => ({
        booking_id: booking.id,

        full_name: passenger.fullName,

        passport_no: passenger.passportNo,

        nationality: passenger.nationality,

        dob: passenger.dob,
      }),
    );

    const { error: passengerError } = await supabase
      .from("passengers")
      .insert(passengers);

    if (passengerError) {
      return NextResponse.json(
        {
          error: "Passenger save failed",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      success: true,

      bookingId: booking.id,

      pnr: booking.pnr_code,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
