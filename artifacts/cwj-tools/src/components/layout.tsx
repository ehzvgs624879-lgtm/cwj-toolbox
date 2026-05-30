import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Wrench, Menu, X, Cpu, Info } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "HOME", icon: Terminal },
    { href: "/tools", label: "TOOLS", icon: Wrench },
    { href: "/about", label: "ABOUT", icon: Info },
  ];

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground dark">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-card border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group outline-none">
            <Cpu className="w-6 h-6 text-primary group-hover:text-[#00d4ff] transition-colors" />
            <span className="font-sans font-bold text-xl tracking-wider text-white neon-glow">
              CWJ<span className="text-primary group-hover:text-[#00d4ff] transition-colors">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-mono tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-white neon-glow"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-card border-t border-white/5 overflow-hidden"
            >
              <div className="flex flex-col py-4 px-4 gap-4">
                {navLinks.map((link) => {
                  const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-mono tracking-widest py-3 px-4 rounded-lg flex items-center gap-3 transition-all ${
                        isActive
                          ? "bg-primary/10 text-white border border-primary/20"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Page Transitions */}
      <main className="flex-1 pt-24 pb-20 w-full relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/5 py-8 mt-auto relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="font-bold tracking-wider text-white">CWJ TOOLS</span>
          </div>
          <p className="text-muted-foreground font-mono text-xs">
            SYSTEM.ONLINE // {new Date().getFullYear()} // ALL SYSTEMS NOMINAL
          </p>
        </div>
      </footer>
    </div>
  );
}