"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Heart, Sparkles, ChevronRight } from 'lucide-react';
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
    image: "https://cdn.shopify.com/s/files/1/0078/6631/8938/files/living-room-banner-min.jpg?v=1601842088",
    accent: "from-slate-50 to-indigo-100",
  },
  {
    id: 3,
    title: "Slow Wellness",
    subtitle: "Rituals for rest and restoration",
    count: 18,
    image: "https://m.media-amazon.com/images/I/81+KeUy4-0L._AC_UF1000,1000_QL80_.jpg",
    accent: "from-emerald-50 to-teal-100",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Lindqvist",
    location: "Stockholm",
    rating: 5,
    text: "The ceramic pour-over set has completely transformed my mornings. The quality is exceptional and it looks beautiful on my counter.",
    product: "Ceramic Pour-Over Set",
    avatar: "https://migma.ai/images/avatars/mara.png",
  },
  {
    id: 2,
    name: "James Okafor",
    location: "London",
    rating: 5,
    text: "I bought the linen throw as a gift and ended up ordering one for myself. The texture and weight are perfect for year-round use.",
    product: "Linen Throw Blanket",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
  },
  {
    id: 3,
    name: "Chloe Beaumont",
    location: "Paris",
    rating: 5,
    text: "Lumière understands that good design is about feeling as much as looking. Every piece I've bought has that quality.",
    product: "Lavender Body Oil",
    avatar: "https://pbs.twimg.com/profile_images/1003006088885817345/troGeDvp.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description: "Complimentary delivery on all qualifying orders, worldwide.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return any item within 30 days, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Guarantee",
    description: "Every product is backed by our craftsmanship promise.",
  },
  {
    icon: Sparkles,
    title: "Curated Quality",
    description: "selected peace",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5" data-atomic-id="amgf7s">
      <div className="flex items-center gap-0.5" data-atomic-id="a1iyj497">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500" data-atomic-id="a136mujg">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);

  const badgeColors: Record<string, string> = {
    Bestseller: "bg-amber-100 text-amber-700",
    New: "bg-indigo-100 text-indigo-700",
    Sale: "bg-rose-100 text-rose-700",
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.16)] transition-shadow duration-300"
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-slate-50"
        data-atomic-id="a1l57wls">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-atomic-id="a15od71" />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badge] ?? "bg-slate-100 text-slate-700"}`}
            data-atomic-id="a1y6d8w">
            {product.badge}
          </span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200"
        >
          <Heart
            size={14}
            className={
              wished
                ? "fill-rose-500 text-rose-500"
                : "text-slate-400 group-hover:text-slate-600"
            }
          />
        </motion.button>
      </div>
      {/* Content */}
      <div className="p-4" data-atomic-id="a1l81kus">
        <p
          className="text-xs text-indigo-600 font-medium mb-1"
          data-atomic-id="av4jkpw">
          {product.category}
        </p>
        <h3
          className="text-sm font-semibold text-slate-900 mb-1 tracking-tight"
          data-atomic-id="awqerdd">
          {product.name}
        </h3>
        <p
          className="text-xs text-slate-500 mb-3 leading-relaxed"
          data-atomic-id="av4jo2w">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviews} />
        <div
          className="flex items-center justify-between mt-3"
          data-atomic-id="aev2q3j">
          <div className="flex items-baseline gap-2" data-atomic-id="awqvvcy">
            <span className="text-base font-bold text-slate-900" data-atomic-id="a1iv3qdw">
              ${product.price}
            </span>
            {product.originalPrice !== null && (
              <span className="text-xs text-slate-400 line-through" data-atomic-id="a1sfxtvm">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [email, setEmail] = useState("");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden" data-atomic-id="a8mzbt1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-20"
        data-atomic-id="aqp6m0q">
        {/* Subtle mesh glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          data-atomic-id="ad5pi99">
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl"
            data-atomic-id="azx7nio" />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/60 blur-3xl"
            data-atomic-id="azymhn6" />
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          data-atomic-id="ad74cdr"
          style={{
            color: "#ef4444"
          }}>Shop Now for</div>
      </section>
      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100" data-atomic-id="adx5am6">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          data-atomic-id="aqo1str">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp, __atomicIdx) => (<motion.div
              key={vp.title}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"
                data-atomic-id="arqzdkz"
                data-atomic-instance={__atomicIdx}>
                <vp.icon size={18} className="text-indigo-600" />
              </div>
              <div data-atomic-id="arse7ph" data-atomic-instance={__atomicIdx}>
                <p
                  className="text-sm font-semibold text-slate-900"
                  data-atomic-id="a1lmdwtx"
                  data-atomic-instance={__atomicIdx}>
                  {vp.title}
                </p>
                <p
                  className="text-xs text-slate-500 mt-0.5 leading-relaxed"
                  data-atomic-id="a1lmdyif"
                  data-atomic-instance={__atomicIdx}>
                  {vp.description}
                </p>
              </div>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── Collections ───────────────────────────────────────────────────── */}
      <section
        id="collections"
        className="py-24 md:py-32 bg-slate-50"
        data-atomic-id="a9npdt5">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a82ai9m">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <span
                className="text-xs font-semibold tracking-widest uppercase text-indigo-600"
                data-atomic-id="a1ae0xde">
                {t("collections.eyebrow")}
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mt-2 text-balance"
                data-atomic-id="a8ghg7w">
                {t("collections.heading")}
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-atomic-id="a1er5ogy">
              {collections.map((col, i) => (
                <motion.a
                  key={col.id}
                  href="#products"
                  variants={i === 1 ? scaleIn : fadeInUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`group relative rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.16)] transition-shadow duration-300 ${i === 1 ? "md:row-span-1 md:scale-[1.02]" : ""}`}
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    data-atomic-id="ajkk51v"
                    data-atomic-instance={i}>
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-atomic-id="a1cudynk"
                      data-atomic-instance={i} />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"
                      data-atomic-id="a1cvsohk"
                      data-atomic-instance={i} />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      data-atomic-id="a1cx7im2"
                      data-atomic-instance={i}>
                      <p
                        className="text-xs text-white/70 mb-1"
                        data-atomic-id="a14yruy"
                        data-atomic-instance={i}>{col.subtitle}</p>
                      <h3
                        className="text-xl font-bold text-white tracking-tight"
                        data-atomic-id="a11jx2nr"
                        data-atomic-instance={i}>
                        {col.title}
                      </h3>
                      <p
                        className="text-xs text-white/60 mt-1"
                        data-atomic-id="a14yv7y"
                        data-atomic-instance={i}>
                        {col.count} products
                      </p>
                      <span
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-white/90 group-hover:gap-2 transition-all duration-200"
                        data-atomic-id="a1jd73pu"
                        data-atomic-instance={i}>
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Products ──────────────────────────────────────────────────────── */}
      <section
        id="products"
        className="py-24 md:py-32 bg-white"
        data-atomic-id="a1vws4dp">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="alm1mym">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
            >
              <div data-atomic-id="a1xf41uv">
                <span
                  className="text-xs font-semibold tracking-widest uppercase text-indigo-600"
                  data-atomic-id="a1dayh89">
                  {t("products.eyebrow")}
                </span>
                <h2
                  className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mt-2 text-balance"
                  data-atomic-id="alb5un7">
                  {t("products.heading")}
                </h2>
              </div>
              <a
                href="#collections"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200 whitespace-nowrap"
                data-atomic-id="ai2do87">
                View all <ChevronRight size={16} />
              </a>
            </motion.div>

            {/* Category filter */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-2 mb-10"
            >
              {productCategories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            {/* Product grid */}
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── About / Brand Story ───────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden"
        data-atomic-id="a1j4qsz5">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="az5srnm">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            data-atomic-id="acyt3wl">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_4px_8px_rgba(0,0,0,0.3),0_24px_60px_-16px_rgba(0,0,0,0.5)] border border-white/10"
                data-atomic-id="a8lqsrx">
                <img
                  src="https://blooloop.com/media-library/atelier-des-lumieres-japan-waves.jpg?id=56454334&width=1200&height=600&coordinates=0%2C138%2C0%2C139"
                  alt="Lumière atelier"
                  className="w-full h-full object-cover"
                  data-atomic-id="a4rr1u2" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 bottom-12 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <p className="text-3xl font-bold text-white" data-atomic-id="a142cujl">2016</p>
                <p className="text-xs text-white/60 mt-0.5" data-atomic-id="a142cw83">Founded in Paris</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6"
              >
                <span className="w-6 h-px bg-indigo-400" data-atomic-id="aia1lab" />
                {t("about.eyebrow")}
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-6"
              >
                {t("about.heading")}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-5 text-pretty"
              >
                {t("about.body1")}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-10 text-pretty"
              >
                {t("about.body2")}
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
              >
                {[
                  { value: "48", label: "Artisan partners" },
                  { value: "22", label: "Countries served" },
                  { value: "98%", label: "Satisfaction rate" },
                ].map((s, __atomicIdx) => (<motion.div key={s.label} variants={fadeInUp}>
                  <p
                    className="text-3xl font-bold text-white"
                    data-atomic-id="abhj9kn"
                    data-atomic-instance={__atomicIdx}>{s.value}</p>
                  <p
                    className="text-xs text-slate-500 mt-1"
                    data-atomic-id="abhjb95"
                    data-atomic-instance={__atomicIdx}>{s.label}</p>
                </motion.div>))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-white to-indigo-50/30"
        data-atomic-id="a4e1xzg">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1jl0ud9">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span
                className="text-xs font-semibold tracking-widest uppercase text-indigo-600"
                data-atomic-id="a19h8ygl">
                {t("testimonials.eyebrow")}
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mt-2 text-balance"
                data-atomic-id="a1ikky73">
                {t("testimonials.heading")}
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-atomic-id="a1fv9grp">
              {testimonials.map((review, i) => (
                <motion.div
                  key={review.id}
                  variants={i === 1 ? scaleIn : fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.16)] transition-shadow duration-300 ${i === 1 ? "md:scale-[1.03]" : ""}`}
                >
                  <div
                    className="flex items-center gap-0.5 mb-4"
                    data-atomic-id="ayakvo6"
                    data-atomic-instance={i}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p
                    className="text-sm text-slate-700 leading-relaxed mb-5 text-pretty"
                    data-atomic-id="a156sylh"
                    data-atomic-instance={i}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div
                    className="flex items-center gap-3 pt-4 border-t border-slate-100"
                    data-atomic-id="aydejx6"
                    data-atomic-instance={i}>
                    <div
                      className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-black/5"
                      data-atomic-id="a42zf4t"
                      data-atomic-instance={i}>
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                        data-atomic-id="a1429wl6"
                        data-atomic-instance={i} />
                    </div>
                    <div data-atomic-id="a44e99b" data-atomic-instance={i}>
                      <p
                        className="text-sm font-semibold text-slate-900"
                        data-atomic-id="ameyftb"
                        data-atomic-instance={i}>
                        {review.name}
                      </p>
                      <p
                        className="text-xs text-slate-500"
                        data-atomic-id="ameyhht"
                        data-atomic-instance={i}>{review.location}</p>
                    </div>
                    <span
                      className="ml-auto text-xs text-indigo-600 font-medium"
                      data-atomic-id="a1uavr1s"
                      data-atomic-instance={i}>
                      {review.product}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Newsletter / CTA ─────────────────────────────────────────────── */}
      <section
        id="newsletter"
        className="py-24 md:py-32 bg-indigo-600 relative overflow-hidden"
        data-atomic-id="a1qn4ok0">
        {/* Background texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          data-atomic-id="a1x66t6r">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            data-atomic-id="a196a9ba" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-800/40 blur-3xl"
            data-atomic-id="a197p3fs" />
        </div>

        <div
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-atomic-id="a1x7lnb9">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-indigo-200 mb-6"
            >
              <span className="w-6 h-px bg-indigo-300" data-atomic-id="aj4un7h" />
              {t("newsletter.eyebrow")}
              <span className="w-6 h-px bg-indigo-300" data-atomic-id="alq1vgh" />
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance mb-4"
            >
              {t("newsletter.heading")}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-indigo-200 leading-relaxed mb-10 text-pretty"
            >
              {t("newsletter.subtext")}
            </motion.p>

            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
                data-atomic-id="ax6huwx" />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              >
                {t("newsletter.cta")}
              </motion.button>
            </motion.form>

            <motion.p
              variants={fadeInUp}
              className="text-xs text-indigo-300 mt-4"
            >
              {t("newsletter.disclaimer")}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}