/*
  # Initial Schema Setup

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `owner_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `store_id` (uuid, references stores)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `images` (text[])
      - `features` (text[])
      - `stock` (integer)
      - `is_digital` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `store_id` (uuid, references stores)
      - `product_id` (uuid, references products)
      - `customer_id` (uuid, references auth.users)
      - `customer_email` (text)
      - `status` (text)
      - `payment_status` (text)
      - `amount` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  owner_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  images text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  stock integer DEFAULT 0,
  is_digital boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products ON DELETE CASCADE NOT NULL,
  customer_id uuid REFERENCES auth.users NOT NULL,
  customer_email text NOT NULL,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own stores"
  ON stores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own stores"
  ON stores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own stores"
  ON stores
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can view products from their stores"
  ON products
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM stores
    WHERE stores.id = products.store_id
    AND stores.owner_id = auth.uid()
  ));

CREATE POLICY "Users can manage products in their stores"
  ON products
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM stores
    WHERE stores.id = products.store_id
    AND stores.owner_id = auth.uid()
  ));

CREATE POLICY "Users can view their store orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM stores
    WHERE stores.id = orders.store_id
    AND stores.owner_id = auth.uid()
  ));