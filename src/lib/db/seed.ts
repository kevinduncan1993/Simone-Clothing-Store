import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedProducts = [
  {
    name: "Classic Logo Tee",
    price: 35,
    image: "/images/placeholder.svg",
    description: "Heavyweight cotton tee with embroidered Simone logo.",
    sizes: ["S", "M", "L", "XL"] as string[],
    category: "Men",
    rating: 5,
    reviews: "2.1k",
  },
  {
    name: "Essential Hoodie",
    price: 75,
    image: "/images/placeholder.svg",
    description: "Relaxed-fit hoodie in premium French terry.",
    sizes: ["S", "M", "L", "XL"] as string[],
    category: "Men",
    rating: 5,
    reviews: "3.5k",
  },
  {
    name: "Cargo Pants",
    price: 90,
    image: "/images/placeholder.svg",
    description: "Utility cargo pants with adjustable hem.",
    sizes: ["S", "M", "L", "XL"] as string[],
    category: "Men",
    rating: 4,
    reviews: "1.8k",
  },
  {
    name: "Dad Cap",
    price: 28,
    image: "/images/placeholder.svg",
    description: "Washed cotton cap with embroidered logo.",
    sizes: ["One Size"] as string[],
    category: "Accessories",
    rating: 5,
    reviews: "4.2k",
  },
  {
    name: "Oversized Crewneck",
    price: 65,
    image: "/images/placeholder.svg",
    description: "Drop-shoulder crewneck in heavyweight fleece.",
    sizes: ["S", "M", "L", "XL"] as string[],
    category: "Women",
    rating: 5,
    reviews: "2.8k",
  },
  {
    name: "Track Jacket",
    price: 110,
    image: "/images/placeholder.svg",
    description: "Retro-inspired track jacket with contrast piping.",
    sizes: ["S", "M", "L", "XL"] as string[],
    category: "Limited Edition",
    rating: 5,
    reviews: "1.2k",
  },
];

async function seed() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL DEFAULT '/images/placeholder.svg',
      description TEXT NOT NULL DEFAULT '',
      sizes JSONB NOT NULL DEFAULT '["S","M","L","XL"]',
      category TEXT NOT NULL DEFAULT 'Men',
      rating INTEGER NOT NULL DEFAULT 5,
      reviews TEXT NOT NULL DEFAULT '0',
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      items JSONB NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      square_payment_id TEXT,
      customer_email TEXT,
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  console.log("Tables created. Seeding products...");

  for (const product of seedProducts) {
    await db.insert(products).values(product);
  }

  console.log(`Seeded ${seedProducts.length} products.`);
  console.log("Done!");
}

seed().catch(console.error);
