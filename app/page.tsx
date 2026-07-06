"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Heart, Sparkles, ChevronRight, Mail } from 'lucide-react';
import { brand, productCategories, type ProductCategory } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline Data ────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    category: "Home" as ProductCategory,
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviews: 214,
    badge: "Bestseller",
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    description: "Hand-thrown stoneware with a matte glaze finish.",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Home" as ProductCategory,
    price: 94,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    description: "Stonewashed European linen, naturally breathable.",
  },
  {
    id: 3,
    name: "Aromatherapy Diffuser",
    category: "Wellness" as ProductCategory,
    price: 52,
    originalPrice: 65,
    rating: 4.7,
    reviews: 302,
    badge: "Sale",
    image: "https://m.media-amazon.com/images/I/61sfyvxvkrL.jpg",
    description: "Ultrasonic mist with warm-wood housing.",
  },
  {
    id: 4,
    name: "Merino Wool Scarf",
    category: "Apparel" as ProductCategory,
    price: 78,
    originalPrice: null,
    rating: 4.9,
    reviews: 95,
    badge: null,
    image: "https://arancrafts.com/wp-content/uploads/2016/06/1011-TRADITIONAL-MERINO-WOOL-HONEYCOMB-SCARF.jpg",
    description: "Extra-fine 18.5-micron merino, woven in Scotland.",
  },
  {
    id: 5,
    name: "Leather Card Holder",
    category: "Accessories" as ProductCategory,
    price: 44,
    originalPrice: null,
    rating: 4.8,
    reviews: 143,
    badge: "New",
    image: "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    description: "Full-grain vegetable-tanned leather, ages beautifully.",
  },
  {
    id: 6,
    name: "Lavender Body Oil",
    category: "Wellness" as ProductCategory,
    price: 36,
    originalPrice: null,
    rating: 4.9,
    reviews: 261,
    badge: null,
    image: "https://pics.walgreens.com/prodimg/463065/900.jpg",
    description: "Cold-pressed jojoba base with Provençal lavender.",
  },
  {
    id: 7,
    name: "Walnut Serving Board",
    category: "Home" as ProductCategory,
    price: 58,
    originalPrice: 72,
    rating: 4.7,
    reviews: 119,
    badge: "Sale",
    image: "https://i.etsystatic.com/7810056/r/il/dced9c/3956879974/il_1080xN.3956879974_8un5.jpg",
    description: "Solid American black walnut, food-safe oil finish.",
  },
  {
    id: 8,
    name: "Silk Sleep Mask",
    category: "Wellness" as ProductCategory,
    price: 29,
    originalPrice: null,
    rating: 4.8,
    reviews: 388,
    badge: "Bestseller",
    image: "https://m.media-amazon.com/images/I/61obj0CqXCL.jpg",
    description: "22-momme mulberry silk, adjustable strap.",
  },
];

const collections = [
  {
    id: 1,
    title: "Morning Rituals",
    subtitle: "Start every day with intention",
    count: 24,
    image: "https://cdn.sanity.io/images/ruord509/production/a270bb6acf40cc4b121fd220b4274aa798ce2660-800x800.jpg?w=3840&q=75&fit=clip&auto=format",
    accent: "from-amber-50 to-orange-100",
  },
  {
    id: 2,
    title: "The Living Room Edit",
    subtitle: "Considered pieces for shared spaces",
    count: 31,
    image: "https://cdn.shopify.com/s/files/1/0078/6631/8938/files/living-room-banner-min.jpg",
    accent: "from-slate-50 to-slate-100",
  },
  {
    id: 3,
    title: "Wellness Essentials",
    subtitle: "Rituals for body and mind",
    count: 18,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    accent: "from-green-50 to-emerald-100",
  },
];

const stats = [
  { value: "10k+", label: "Happy Customers" },
  { value: "500+", label: "Curated Products" },
  { value: "2,4002323", label: "5-Star Reviews" },
  { value: "48h", label: "Avg. Delivery" },
];

const trustFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "256-bit SSL encryption",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Curated for lasting value",
  },
];

// ─── Badge Color Map ─────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  Bestseller: "bg-amber-100 text-amber-700",
  New: "bg-indigo-100 text-indigo-700",
  Sale: "bg-rose-100 text-rose-600",
};

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: {
  product: (typeof products)[0];
  onAddToCart: (id: number) => void;
}) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/400x400/f8fafc/94a3b8?text=Product";
          }}
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeStyles[product.badge] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={15}
            className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-500 font-medium mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200 fill-slate-200"
              }
            />
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-indigo-300 text-xs font-medium tracking-wide">
                New Collection — Summer 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              {t("hero.headline")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                {t("hero.headlineAccent")}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {t("hero.subheadline")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                {t("hero.cta")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#collections"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 border border-white/10"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — floating product cards */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden ${
                  i === 1 ? "mt-8" : i === 3 ? "-mt-4" : ""
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/400x400/1e293b/64748b?text=Product";
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-indigo-300 text-xs">${p.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trust Features ── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustFeatures.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{f.title}</p>
                  <p className="text-xs text-slate-500">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-2">
              {t("products.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t("products.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-lg max-w-xl mx-auto">
              {t("products.subheading")}
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>

          {/* View All */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50"
            >
              {t("products.viewAll")}
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-2">
              {t("collections.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900">
              {t("collections.heading")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {collections.map((col) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/800x600/f1f5f9/94a3b8?text=Collection";
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-xs mb-1">{col.count} products</p>
                  <h3 className="text-white text-xl font-bold mb-1">{col.title}</h3>
                  <p className="text-white/70 text-sm">{col.subtitle}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-indigo-300 text-sm font-medium group-hover:gap-2 transition-all">
                    {t("collections.explore")} <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="bg-indigo-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 mb-6">
              <Mail size={22} className="text-white" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t("newsletter.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-200 text-lg mb-8">
              {t("newsletter.subheading")}
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-white font-semibold text-lg"
              >
                🎉 {t("newsletter.successMessage")}
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                />
                <button
                  type="submit"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  {t("newsletter.cta")}
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
