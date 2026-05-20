insert into flights (
    flight_no,
    origin,
    destination,
    departs_at,
    arrives_at,
    aircraft_type,
    base_price
)
values
(
    'AI101',
    'Kolkata',
    'Delhi',
    now() + interval '1 day',
    now() + interval '1 day 2 hours',
    'Airbus A320',
    4500
),
(
    'AI102',
    'Delhi',
    'Mumbai',
    now() + interval '2 day',
    now() + interval '2 day 2 hours',
    'Boeing 737',
    5200
),
(
    'AI103',
    'Mumbai',
    'Bangalore',
    now() + interval '3 day',
    now() + interval '3 day 2 hours',
    'Boeing 787',
    6500
);