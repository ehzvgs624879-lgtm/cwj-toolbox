import { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="container mx-auto px-4 max-w-4xl w-full">
      <Link 
        href="/tools" 
        className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </Link>

      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{title}</h1>
        <p className="text-muted-foreground font-mono">{description}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        {children}
      </motion.div>
    </div>
  );
}