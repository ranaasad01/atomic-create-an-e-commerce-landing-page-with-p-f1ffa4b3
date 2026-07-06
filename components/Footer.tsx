"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail, ArrowRight } from 'lucide-react';
import { brand } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const footerSections = [
  {
    titleKey: "footer.shop",
    links: [
      { labelKey: "footer.newArrivals", href: "#products" },
      { labelKey: "footer.bestSellers", href: "#products" },
      { labelKey: "footer.sale", href: "#products" },
      { labelKey: "footer.collections", href: "#collections" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.about", href: "#about" },
      { labelKey: "footer.careers", href: "#about" },
      { labelKey: "footer.press", href: "#about" },
      { labelKey: "footer.sustainability", href: "#about" },
    ],
  },
  {
    titleKey: "footer.support",
    links: [
      { labelKey: "footer.contact", href: "#newsletter" },
      { labelKey: "footer.faq", href: "#newsletter" },
      { labelKey: "footer.shipping", href: "#newsletter" },
      { labelKey: "footer.returns", href: "#newsletter" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-semibold text-white tracking-tight">
                {brand.name}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.brandDescription")}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 border border-white/5"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.titleKey} variants={fadeInUp}>
              <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            {t("footer.copyright", { year: "2025", brand: brand.name })}
          </p>
          <div className="flex items-center gap-6">
            {["footer.privacy", "footer.terms", "footer.cookies"].map((key) => (
              <a
                key={key}
                href="#"
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}