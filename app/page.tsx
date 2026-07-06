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
    image: "https://cdn.shopify.com/s/files/1/0078/6631/8938/files/living-room-banner-min.jpg?v=1604071165",
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

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast, reliable delivery to your door.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "256-bit SSL encryption keeps your information safe.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Guarantee",
    description: "Not happy? Return within 30 days for a full refund.",
  },
];

// ─── Badge colour helper ─────────────────────────────────────────────────────
function badgeClass(badge: string) {
  if (badge === "Sale") return "bg-rose-500 text-white";
  if (badge === "New") return "bg-indigo-600 text-white";
  return "bg-amber-400 text-slate-900";
}

// ─── Star renderer ───────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </span>
  );
}

// ─── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart }: { product: typeof products[0]; onAddToCart: (id: number) => void }) {
  const [wished, setWished] = useState(false);
  const t = useTranslations();

  return (
    <motion.div
      variants={scaleIn}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x400/f8fafc/94a3b8?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-1">{product.description}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-slate-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product.id)}
            className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors duration-200 active:scale-95"
          >
            {t("product.addToCart")}
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

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-800/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium tracking-wide uppercase">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              {t("hero.headline")}
              <span className="block text-indigo-400">{t("hero.headlineAccent")}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              {t("hero.subheadline")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 hover:-translate-y-0.5"
              >
                {t("hero.cta")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#collections"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10 hover:-translate-y-0.5"
              >
                {t("hero.secondary")}
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "12k+", label: t("hero.stat1") },
                { value: "4.9", label: t("hero.stat2") },
                { value: "98%", label: t("hero.stat3") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image grid */}
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
                className={`rounded-2xl overflow-hidden aspect-square bg-slate-800 ${i === 1 ? "mt-8" : ""} ${i === 3 ? "-mt-8" : ""}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://placehold.co/400x400/1e293b/94a3b8?text=${encodeURIComponent(p.name)}`;
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features / Trust Bar ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p
                    className="font-semibold text-slate-900 mb-1"
                    {...(index === 2 ? { style: { color: '#ef4444' } } : {})}
                  >
                    {feature.title}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t("collections.title")}</h2>
            <p className="text-slate-500 text-lg">{t("collections.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://placehold.co/800x600/f1f5f9/94a3b8?text=${encodeURIComponent(col.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-sm mb-1">{col.subtitle}</p>
                  <h3 className="text-white text-xl font-bold mb-2">{col.title}</h3>
                  <span className="inline-flex items-center gap-1 text-indigo-300 text-sm font-medium">
                    {col.count} {t("collections.items")} <ChevronRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{t("products.title")}</h2>
              <p className="text-slate-500">{t("products.subtitle")}</p>
            </div>
            <Link href="#" className="text-indigo-600 font-medium text-sm hover:underline flex items-center gap-1 shrink-0">
              {t("products.viewAll")} <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full border border-indigo-500/30">
                <Sparkles size={14} /> {t("newsletter.badge")}
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("newsletter.title")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg mb-8">
              {t("newsletter.subtitle")}
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-6 text-indigo-300 font-medium"
              >
                {t("newsletter.success")}
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
                  placeholder={t("newsletter.placeholder")}
                  required
                  className="flex-1 bg-white/10 border border-white/10 text-white placeholder-slate-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/40 whitespace-nowrap"
                >
                  {t("newsletter.cta")}
                </button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-slate-500 text-xs mt-4">
              {t("newsletter.disclaimer")}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
