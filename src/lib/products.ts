export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  category: string;
  rating: number;
  reviews: string;
}

export const categories = [
  "All",
  "Men",
  "Women",
  "Accessories",
  "Limited Edition",
];

export const collections = [
  {
    name: "THE ESSENTIALS",
    description: "Daily staples reimagined.",
    image: "/images/placeholder.svg",
  },
  {
    name: "URBAN PULSE",
    description: "Street-born, culture-driven.",
    image: "/images/placeholder.svg",
  },
  {
    name: "LIMITED COLLABS",
    description: "Art meets fashion.",
    image: "/images/placeholder.svg",
  },
  {
    name: "NOIR EDITION",
    description: "Sleek, dark, iconic.",
    image: "/images/placeholder.svg",
  },
];

// Replace placeholder images with your own product photos in /public/images/
export const products: Product[] = [
  {
    id: "1",
    name: "Classic Logo Tee",
    price: 35,
    image: "/images/placeholder.svg",
    images: [],
    description: "Heavyweight cotton tee with embroidered Simone logo.",
    sizes: ["S", "M", "L", "XL"],
    category: "Men",
    rating: 5,
    reviews: "2.1k",
  },
  {
    id: "2",
    name: "Essential Hoodie",
    price: 75,
    image: "/images/placeholder.svg",
    images: [],
    description: "Relaxed-fit hoodie in premium French terry.",
    sizes: ["S", "M", "L", "XL"],
    category: "Men",
    rating: 5,
    reviews: "3.5k",
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: 90,
    image: "/images/placeholder.svg",
    images: [],
    description: "Utility cargo pants with adjustable hem.",
    sizes: ["S", "M", "L", "XL"],
    category: "Men",
    rating: 4,
    reviews: "1.8k",
  },
  {
    id: "4",
    name: "Dad Cap",
    price: 28,
    image: "/images/placeholder.svg",
    images: [],
    description: "Washed cotton cap with embroidered logo.",
    sizes: ["One Size"],
    category: "Accessories",
    rating: 5,
    reviews: "4.2k",
  },
  {
    id: "5",
    name: "Oversized Crewneck",
    price: 65,
    image: "/images/placeholder.svg",
    images: [],
    description: "Drop-shoulder crewneck in heavyweight fleece.",
    sizes: ["S", "M", "L", "XL"],
    category: "Women",
    rating: 5,
    reviews: "2.8k",
  },
  {
    id: "6",
    name: "Track Jacket",
    price: 110,
    image: "/images/placeholder.svg",
    images: [],
    description: "Retro-inspired track jacket with contrast piping.",
    sizes: ["S", "M", "L", "XL"],
    category: "Limited Edition",
    rating: 5,
    reviews: "1.2k",
  },
];

export const testimonials = [
  {
    quote:
      "I love style that has substance, and Simone delivers both. It's not just the looks — it's the philosophy. You can feel the creative energy in every design.",
    name: "Maya R.",
    location: "New York",
  },
  {
    quote:
      "The quality is unmatched. I've worn my Simone hoodie every week for six months and it still looks brand new. This is what real streetwear should be.",
    name: "Jordan K.",
    location: "Los Angeles",
  },
];
