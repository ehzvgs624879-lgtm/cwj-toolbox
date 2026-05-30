import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Search, Activity, Zap, RefreshCw, Terminal } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredTools = [
    { id: "weather", name: "Weather Node", desc: "Real-time atmospheric data", icon: Activity, path: "/tools/weather", status: "ONLINE" },
    { id: "currency", name: "Currency Exchange", desc: "Live market conversion rates", icon: RefreshCw, path: "/tools/currency", status: "ONLINE" },
    { id: "ai-chat", name: "AI Protocol", desc: "Advanced neural communication", icon: Cpu, path: "/tools/ai-chat", status: "SOON" },
    { id: "world-time", name: "Global Sync", desc: "Synchronized timezone tracking", icon: Zap, path: "/tools/world-time", status: "ONLINE" }
  ];

  const changelog = [
    { version: "v1.3", date: "2023-11-15", desc: "Initialized Global Sync & Weather Node" },
    { version: "v1.2", date: "2023-10-20", desc: "Upgraded encryption algorithms" },
    { version: "v1.1", date: "2023-09-05", desc: "System core baseline established" }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#00d4ff]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            SYSTEM INITIALIZED
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-4 neon-glow"
          >
            CWJ TOOLS
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-3xl text-muted-foreground font-light mb-6 tracking-wide"
          >
            Personal AI & Utility Platform
          </motion.p>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          >
            下一代工具集合，精准、快速、永久在线。
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link 
              href="/tools" 
              className="group relative px-8 py-4 bg-primary text-white font-bold tracking-wider rounded-lg overflow-hidden flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              开始使用
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/tools" 
              className="group px-8 py-4 bg-transparent border border-white/20 hover:border-primary/50 text-white font-bold tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:bg-white/5"
            >
              <Cpu className="w-5 h-5 text-primary group-hover:text-[#00d4ff] transition-colors" />
              AI工具
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-white/5 bg-black/40 backdrop-blur-md py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-x divide-white/5">
            {[
              { label: "MODULES", value: "15+ Tools" },
              { label: "UPTIME", value: "24/7 Online" },
              { label: "CAPABILITY", value: "AI Ready" },
              { label: "STATUS", value: "Continuous Updates" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-[10px] md:text-xs font-mono text-primary mb-1 tracking-widest">{stat.label}</span>
                <span className="text-sm md:text-base font-bold text-white tracking-wider">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Featured Tools */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">FEATURED MODULES</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#00d4ff] to-primary rounded-full" />
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search modules..." 
                className="w-full bg-white/5 border-white/10 pl-10 focus:border-primary text-white font-mono placeholder:text-muted-foreground/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={tool.path} className="block h-full">
                  <div className="glass-card h-full p-6 rounded-xl flex flex-col group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                        tool.status === "ONLINE" 
                          ? "border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10" 
                          : "border-primary/30 text-primary bg-primary/10"
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all z-10">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono leading-relaxed mt-auto z-10">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="py-20 bg-black/40 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-12">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-white tracking-tight">SYSTEM LOG</h2>
          </div>
          
          <div className="space-y-6">
            {changelog.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 glass-card p-6 rounded-xl border-l-2 border-l-primary"
              >
                <div className="flex flex-col shrink-0 sm:w-32">
                  <span className="text-xl font-bold text-white neon-glow">{log.version}</span>
                  <span className="text-xs font-mono text-muted-foreground">{log.date}</span>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-white/80 font-mono text-sm sm:text-base">{log.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}