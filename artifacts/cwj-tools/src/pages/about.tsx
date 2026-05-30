import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, Zap, Globe, Github, Twitter, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 max-w-4xl w-full">
      <div className="glass-card rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/30 via-[#00d4ff]/20 to-transparent opacity-50" />
        
        <div className="p-8 md:p-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
          >
            <Cpu className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            关于 CWJ Tools
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-invert prose-p:text-white/70 prose-p:font-mono prose-p:leading-relaxed max-w-none mb-12"
          >
            <p className="text-xl">
              由 CWJ 创建。目标是打造一个简单、高效、持续更新的 AI 与实用工具平台。
            </p>
            <p>
              In a world cluttered with bloated applications and ad-ridden utilities, CWJ Tools aims to provide a clean, uncompromising environment for getting things done. Every tool is designed with a focus on speed, precision, and aesthetics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, title: "Secure", desc: "Client-side processing where possible." },
              { icon: Zap, title: "Fast", desc: "No bloat. Instant execution." },
              { icon: Globe, title: "Accessible", desc: "Available 24/7 globally." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                className="bg-black/40 border border-white/5 p-6 rounded-xl"
              >
                <feature.icon className="w-8 h-8 text-[#00d4ff] mb-4" />
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-mono">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-4 pt-8 border-t border-white/10"
          >
            <span className="text-sm font-mono text-muted-foreground mr-4">CONNECT:</span>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/70">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/70">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-white/70">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}