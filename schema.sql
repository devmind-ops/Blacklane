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
  created_at timestamp with time zone default now()
);

-- RLS for Bookings
alter table bookings enable row level security;
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Public can insert bookings" on bookings for insert with check (true); -- Allow guest bookings

-- SEED DATA
insert into fleet (name, category, description, base_rate, per_km_rate, per_hour_rate, features, image_url) values
('Business Class', 'sedan', 'Mercedes-Benz E-Class, BMW 5 Series', 50, 3.0, 60, '{"passengers": 3, "luggage": 2, "wifi": true}', '/assets/images/business_class_sedan.png'),
('Business Van/SUV', 'van', 'Mercedes-Benz V-Class', 80, 4.5, 90, '{"passengers": 5, "luggage": 6, "wifi": true}', '/assets/images/business_van.png'),
('First Class', 'first', 'Mercedes-Benz S-Class, BMW 7 Series', 100, 6.0, 120, '{"passengers": 3, "luggage": 2, "water": true}', '/assets/images/first_class_sedan.png');
