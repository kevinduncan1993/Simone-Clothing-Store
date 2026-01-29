export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

// Add your products here. Replace the placeholder images with your own.
export const products: Product[] = [
  {
    id: "1",
    name: "Classic Logo Tee",
    price: 35,
    image: "/images/placeholder.svg",
    description: "Heavyweight cotton tee with embroidered Simone logo.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Essential Hoodie",
    price: 75,
    image: "/images/placeholder.svg",
    description: "Relaxed-fit hoodie in premium French terry.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: 90,
    image: "/images/placeholder.svg",
    description: "Utility cargo pants with adjustable hem.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "4",
    name: "Dad Cap",
    price: 28,
    image: "/images/placeholder.svg",
    description: "Washed cotton cap with embroidered logo.",
    sizes: ["One Size"],
  },
];
