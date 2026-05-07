// ─────────────────────────────────────────────────────────────────────────────
// src/components/Header/Header.tsx
//
// Glassmorphic sticky header for Boca Dental and Braces.
//
// Behaviour:
//   • Starts transparent over the hero image
//   • Transitions to dark glass on scroll past 80px
//   • Height collapses 72px → 60px on scroll
//   • Announcement bar above nav — controlled via INITIAL_DATA.announcement
//   • Announcement bar dismissible — persists in sessionStorage
//   • Desktop: logo | center nav links | right CTAs
//   • Mobile: logo | hamburger → slide-down menu
//   • All animations via Framer Motion only
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Phone, X, ChevronRight, Calendar } from 'lucide-react';
import type { Brand, Announcement, NavLink } from '../../types';
import { BocaLogo } from './BocaLogo';

// ── Types ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  brand: Brand;
  announcement: Announcement;
  activeSection?: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'Services',  href: '#services'  },
  { label: 'Locations', href: '#locations' },
  { label: 'Boca Kids', href: '#boca-kids' },
  { label: 'About',     href: '#about'     },
  { label: 'Reviews',   href: '#reviews'   },
];

const SCROLL_THRESHOLD = 80;

const SHIMMER_CSS = `
  @keyframes boca-shimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
`;

// ── Animation Variants ───────────────────────────────────────────────────────

const navItemVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number] },
  },
};

const mobileLinkVariants = {
  hidden:  { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' as const },
  }),
};

// ── AnnouncementBar ───────────────────────────────────────────────────────────

function AnnouncementBar({ data }: { data: Announcement }) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('boca-ann-dismissed') === '1';
  });

  const dismiss = useCallback(() => {
    sessionStorage.setItem('boca-ann-dismissed', '1');
    setDismissed(true);
  }, []);

  if (!data.enabled || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full overflow-hidden"
        style={{ background: 'hsl(var(--color-orange))' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-center gap-3 relative">
          <p className="text-white text-xs sm:text-sm font-body font-semibold text-center leading-tight">
            {data.text}
          </p>

          {data.link && data.linkLabel && (
            <a
              href={data.link}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold
                         bg-white/20 hover:bg-white/30 transition-colors text-white
                         px-3 py-1 rounded-full whitespace-nowrap no-underline"
            >
              {data.linkLabel}
              <ChevronRight size={12} />
            </a>
          )}

          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80
                       hover:text-white transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


// ── DesktopNav ────────────────────────────────────────────────────────────────

function DesktopNav({ activeSection }: { activeSection?: string }) {
  return (
    <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
      {NAV_LINKS.map((link, i) => {
        const isActive = activeSection === link.href.replace('#', '');
        return (
          <motion.a
            key={link.href}
            href={link.href}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            className="relative text-white/85 hover:text-white text-sm font-body
                       font-semibold no-underline transition-colors py-1"
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full"
                style={{ background: 'hsl(var(--color-orange))' }}
              />
            )}
            {!isActive && (
              <span
                className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full
                           scale-x-0 hover:scale-x-100 origin-left transition-transform
                           bg-white/40"
              />
            )}
          </motion.a>
        );
      })}
    </nav>
  );
}

// ── HeaderCTAs ────────────────────────────────────────────────────────────────

function HeaderCTAs({ phone }: { phone: string }) {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <span className="text-white/60 text-[11px] font-body font-semibold uppercase tracking-wider">
        Se Habla Español
      </span>

      <a
        href={`tel:${phone.replace(/\D/g, '')}`}
        className="hidden lg:flex items-center gap-1.5 text-white/75
                   hover:text-white text-xs font-body font-semibold
                   transition-colors no-underline whitespace-nowrap"
      >
        <Phone size={14} />
        {phone}
      </a>

      <a
        href="/contact"
        className="inline-flex items-center gap-2 text-white font-body font-bold
                   text-sm px-5 py-2.5 rounded-btn no-underline transition-colors
                   shadow-lg whitespace-nowrap"
        style={{ background: 'hsl(var(--color-orange))' }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            'hsl(var(--color-orange-hover))')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            'hsl(var(--color-orange))')
        }
      >
        <Calendar size={14} />
        Book Appointment
      </a>
    </div>
  );
}

// ── MobileMenu ────────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
  phone,
}: {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          className="lg:hidden absolute left-0 right-0 top-full px-4 pb-4"
        >
          <div
            className="rounded-card p-4 flex flex-col gap-1"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={mobileLinkVariants}
                onClick={onClose}
                className="flex items-center justify-between py-3 px-2
                           text-white font-body font-semibold text-base
                           no-underline border-b border-white/10 last:border-0
                           hover:text-orange transition-colors"
              >
                {link.label}
                <ChevronRight size={16} className="text-white/40" />
              </motion.a>
            ))}

            <div className="flex flex-col gap-2 mt-4">
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 py-3
                           rounded-lg border border-white/20 text-white
                           font-body font-semibold text-sm no-underline
                           transition-colors hover:bg-white/10"
              >
                <Phone size={14} />
                {phone}
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 py-3
                           rounded-lg text-white font-body font-bold
                           text-sm no-underline transition-colors"
                style={{ background: 'hsl(var(--color-orange))' }}
                onClick={onClose}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'hsl(var(--color-orange-hover))')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'hsl(var(--color-orange))')
                }
              >
                <Calendar size={14} />
                Book Appointment
              </a>
              <span className="text-center text-white/50 text-[11px] font-body font-semibold uppercase tracking-wider mt-2">
                Se Habla Español
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── HamburgerBtn ──────────────────────────────────────────────────────────────

function HamburgerBtn({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block w-6 h-[2px] bg-white rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-6 h-[2px] bg-white rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block w-6 h-[2px] bg-white rounded-full origin-center"
      />
    </button>
  );
}

// ── Header (root export) ──────────────────────────────────────────────────────

/**
 * Header
 * Root header component. Combines announcement bar, glass nav, mobile menu.
 * Never fetches its own data — always receives via props from App.tsx.
 *
 * @example
 *   <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} />
 */
export function Header({ brand, announcement, activeSection }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const { scrollY } = useScroll();

  useEffect(
    () => scrollY.on('change', (v) => setScrolled(v > SCROLL_THRESHOLD)),
    [scrollY]
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <style>{SHIMMER_CSS}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        aria-label={`${brand.name} site header`}
      >
        <AnnouncementBar data={announcement} />

        <motion.div
          animate={{
            background: scrolled ? 'var(--glass-bg)' : 'rgba(16, 29, 74, 0)',
            boxShadow: scrolled ? 'var(--glass-shadow)' : '0 0 0 rgba(0,0,0,0)',
            borderBottom: scrolled
              ? '1px solid var(--glass-border)'
              : '1px solid rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
            WebkitBackdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
          }}
          className="relative w-full"
        >
          <motion.div
            animate={{ height: scrolled ? 60 : 72 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between"
          >
            <BocaLogo />
            <DesktopNav activeSection={activeSection} />
            <HeaderCTAs phone={brand.phone} />
            <HamburgerBtn
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            />
          </motion.div>

          <MobileMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            phone={brand.phone}
          />
        </motion.div>
      </header>
    </>
  );
}

export default Header;
