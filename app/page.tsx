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
    image: "https://m.media-amazon.com/images/I/61sfyvxvkrL.jpg",
    accent: "from-green-50 to-emerald-100",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophie L.",
    location: "London, UK",
    rating: 5,
    text: "The quality exceeded my expectations. Every piece feels intentional and beautifully made.",
    avatar: "SL",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "New York, US",
    rating: 5,
    text: "Fast shipping, gorgeous packaging, and the products are even better in person.",
    avatar: "MT",
  },
  {
    id: 3,
    name: "Aiko N.",
    location: "Tokyo, JP",
    rating: 5,
    text: "I've ordered three times now. Lumière has become my go-to for thoughtful gifts.",
    avatar: "AN",
  },
];

const trustBadges = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $75" },
  { icon: RefreshCw, label: "Easy Returns", sub: "30-day hassle-free" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "256-bit SSL encryption" },
  { icon: Sparkles, label: "Curated Quality", sub: "Handpicked by experts" },
];

// ─── Badge colour helper ─────────────────────────────────────────────────────
function badgeClass(badge: string) {
  if (badge === "Sale") return "bg-rose-500 text-white";
  if (badge === "New") return "bg-indigo-600 text-white";
  return "bg-amber-400 text-slate-900";
}

// ─── Product Card ────────────────────────────────────────────────────────────
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
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/400x300/f1f5f9/94a3b8?text=Product";
          }}
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeClass(product.badge)
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          aria-label="Wishlist"
        >
          <Heart
            size={15}
            className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
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

// ─── Page ────────────────────────────────────────────────────────────────────
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-800/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 text-indigo-300 text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
                <Sparkles size={14} />
                New Collection — Summer 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-6"
            >
              Live with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                intention.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed"
            >
              Discover objects that bring beauty and purpose to everyday life.
              Thoughtfully sourced, beautifully made.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="#products"
                style={{ backgroundColor: '#ef4444' }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
              >
                Explore the Collection
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#collections"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base border border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                View Lookbook
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-20 grid grid-cols-3 gap-8 sm:gap-16"
            >
              {[
                { value: "2,400+", label: "Happy Customers" },
                { value: "180+", label: "Curated Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.label}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <badge.icon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{badge.label}</p>
                  <p className="text-xs text-slate-500">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-medium text-sm tracking-wide uppercase mb-3">
              Our Products
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Thoughtfully curated
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-xl mx-auto">
              Each product is selected for its quality, craftsmanship, and ability to elevate the everyday.
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
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
            >
              View All Products
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-medium text-sm tracking-wide uppercase mb-3">
              Collections
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Shop by lifestyle
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/400x500/f1f5f9/94a3b8?text=Collection";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-indigo-300 text-xs font-medium mb-1">{col.count} products</p>
                    <h3 className="text-white text-xl font-bold mb-1">{col.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{col.subtitle}</p>
                    <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium group-hover:gap-3 transition-all duration-200">
                      Shop Now <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-medium text-sm tracking-wide uppercase mb-3">
              Reviews
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900">
              Loved by customers
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-20 md:py-28 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Mail size={32} className="text-indigo-200 mx-auto" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay in the loop
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-200 mb-8">
              Get early access to new arrivals, exclusive offers, and curated inspiration — straight to your inbox.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-white font-medium"
              >
                ✓ You&apos;re on the list! Welcome to Lumière.
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-indigo-300 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
