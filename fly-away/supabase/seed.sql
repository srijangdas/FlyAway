insert into flights (
    flight_no,
    origin,
    destination,
    departs_at,
    arrives_at,
    aircraft_type,
    status,
    base_price
)
values

-- CCU → DEL
(
'AI101',
'CCU',
'DEL',
'2026-05-25 08:00:00+05:30',
'2026-05-25 10:20:00+05:30',
'Airbus A320',
'scheduled',
4200
),

(
'6E203',
'CCU',
'DEL',
'2026-05-25 14:30:00+05:30',
'2026-05-25 17:00:00+05:30',
'Boeing 737',
'scheduled',
5100
),

-- DEL → BOM
(
'UK990',
'DEL',
'BOM',
'2026-05-25 09:30:00+05:30',
'2026-05-25 11:45:00+05:30',
'Airbus A320',
'scheduled',
5500
),

(
'QP502',
'DEL',
'BOM',
'2026-05-25 18:00:00+05:30',
'2026-05-25 20:10:00+05:30',
'Boeing 737',
'scheduled',
3900
),

-- CCU → BLR
(
'AI445',
'CCU',
'BLR',
'2026-05-25 07:15:00+05:30',
'2026-05-25 10:00:00+05:30',
'Airbus A321',
'scheduled',
6000
),

(
'6E775',
'CCU',
'BLR',
'2026-05-25 16:20:00+05:30',
'2026-05-25 19:05:00+05:30',
'Boeing 737',
'scheduled',
7300
),

-- BOM → MAA
(
'UK303',
'BOM',
'MAA',
'2026-05-25 10:00:00+05:30',
'2026-05-25 12:00:00+05:30',
'Airbus A320',
'scheduled',
4600
),

(
'QP771',
'BOM',
'MAA',
'2026-05-25 19:00:00+05:30',
'2026-05-25 21:15:00+05:30',
'Boeing 737',
'scheduled',
4100
);


do $$
declare
    flight record;
    row_char text;
    seat_num int;
    seat_class text;
begin
    for flight in
        select id from flights
    loop

        foreach row_char in
        array array[
            'A','B','C',
            'D','E','F'
        ]
        loop

            for seat_num in 1..6
            loop

                if row_char in ('A') then
                    seat_class := 'first';

                elsif row_char in ('B','C') then
                    seat_class := 'business';

                else
                    seat_class := 'economy';
                end if;

                insert into seats (
                    flight_id,
                    seat_number,
                    class,
                    is_available,
                    extra_fee
                )
                values (
                    flight.id,
                    row_char || seat_num,
                    seat_class,
                    true,

                    case
                        when seat_class = 'first'
                        then 3000

                        when seat_class = 'business'
                        then 1500

                        else 0
                    end
                );

            end loop;

        end loop;

    end loop;
end $$;