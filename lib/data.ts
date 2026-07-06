export interface NavLink {
  label: string;
  href: string;
}

export interface BrandConstants {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const brand: BrandConstants = {
  name: "Lumière",
  tagline: "Crafted for modern living",
  ctaLabel: "Shop Now",
  ctaHref: "#products",
};

export type ProductCategory = "All" | "Home" | "Wellness" | "Accessories" | "Apparel";

export const productCategories: ProductCategory[] = [
  "All",
  "Home",
  "Wellness",
  "Accessories",
  "Apparel",
];