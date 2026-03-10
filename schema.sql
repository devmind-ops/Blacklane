-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- FLEET TABLE
create table fleet (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null, -- 'sedan', 'van', 'first'
  description text,
  base_rate numeric not null,
  per_km_rate numeric not null,
  per_hour_rate numeric not null,
  features jsonb default '{}'::jsonb, -- e.g. {"passengers": 3, "luggage": 2, "wifi": true}
  image_url text,
  created_at timestamp with time zone default now()
);

-- RLS for Fleet (Public Read, Admin Write)
alter table fleet enable row level security;
create policy "Public can view fleet" on fleet for select using (true);

-- BOOKINGS TABLE
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id), -- Optional if we allow guest checkout
  pickup_location text not null,
  dropoff_location text, -- Nullable for hourly
  pickup_time timestamp with time zone not null,
  vehicle_id uuid references fleet(id),
  booking_type text not null, -- 'one-way' or 'hourly'
  duration_hours int, -- Only for hourly
  calculated_price numeric,
  status text default 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  customer_details jsonb, -- { "name": "...", "email": "...", "phone": "..." }
  flight_number text,
  airport_code text,
  airline text,
  pickup_method text, -- 'curbside' or 'meet-greet'
  notes text,
  created_at timestamp with time zone default now()
);

-- RLS for Bookings
alter table bookings enable row level security;
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Public can insert bookings" on bookings for insert with check (true); -- Allow guest bookings

-- SEED DATA
insert into fleet (name, category, description, base_rate, per_km_rate, per_hour_rate, features, image_url) values
('TC Sedan', 'sedan', 'Tesla, Standard Sedans', 50, 3.0, 60, '{"passengers": 3, "luggage": 3, "wifi": true}', '/assets/images/business_class_sedan.png'),
('Full-Size SUV', 'suv', 'Escalade, Navigator', 80, 4.5, 90, '{"passengers": 6, "luggage": 5, "wifi": true}', '/assets/images/business_van.png'),
('S-Class Sedan', 's-class', 'Mercedes-Benz S-Class', 100, 6.0, 120, '{"passengers": 3, "luggage": 3, "water": true}', '/assets/images/first_class_sedan.png'),
('Sprinter Van', 'sprinter', 'Mercedes Sprinter', 120, 7.5, 150, '{"passengers": 11, "luggage": 11, "wifi": true}', '/assets/images/business_van.png');
