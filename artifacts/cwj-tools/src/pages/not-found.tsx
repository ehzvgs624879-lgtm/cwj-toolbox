import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-2xl flex flex-col items-center text-center max-w-md w-full border border-destructive/20"
      >
        <AlertCircle className="w-16 h-16 text-destructive mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white mb-2 tracking-widest neon-glow">404</h1>
        <div className="h-px w-16 bg-destructive/50 my-4" />
        <h2 className="text-xl font-mono text-white mb-4">SYSTEM_ERROR: DIRECTORY_NOT_FOUND</h2>
        <p className="text-muted-foreground font-mono text-sm mb-8">
          The requested module or directory does not exist in the current system registry.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-white/5 border border-white/10 hover:border-primary/50 text-white font-mono tracking-widest rounded transition-all hover:bg-primary/10"
        >
          RETURN TO HOME
        </Link>
      </motion.div>
    </div>
  );
}