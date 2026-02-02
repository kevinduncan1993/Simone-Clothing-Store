import { pgTable, text, integer, real, json, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  image: text("image").notNull().default("/images/placeholder.svg"),
  description: text("description").notNull().default(""),
  sizes: json("sizes").$type<string[]>().notNull().default(["S", "M", "L", "XL"]),
  category: text("category").notNull().default("Men"),
  rating: integer("rating").notNull().default(5),
  reviews: text("reviews").notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  items: json("items").$type<{ productId: string; name: string; price: number; size: string; quantity: number }[]>().notNull(),
  total: real("total").notNull(),
  status: text("status").notNull().default("pending"),
  squarePaymentId: text("square_payment_id"),
  customerEmail: text("customer_email"),
  shippingAddress: text("shipping_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteContent = pgTable("site_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").notNull().unique(),
  heading: text("heading").notNull(),
  body1: text("body1").notNull(),
  body2: text("body2").notNull(),
  image: text("image").notNull().default("/images/owner.svg"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type SiteContent = typeof siteContent.$inferSelect;
