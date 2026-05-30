import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Cloud, DollarSign, Clock, Calendar, Key, 
  FileJson, Hash, Link as LinkIcon, Type, 
  MessageSquare, Languages, PenTool, Code, 
  Image as ImageIcon, FileText, Info
} from "lucide-react";

export default function Tools() {
  const categories = [
    {
      title: "AI Tools",
      description: "Neural network powered utilities",
      tools: [
        { name: "AI Chat", path: "/tools/ai-chat", icon: MessageSquare, status: "Soon" },
        { name: "AI Translate", path: "/tools/ai-translate", icon: Languages, status: "Soon" },
        { name: "AI Copywriter", path: "/tools/ai-copy", icon: PenTool, status: "Soon" },
        { name: "AI Code Assistant", path: "/tools/ai-code", icon: Code, status: "Soon" },
      ]
    },
    {
      title: "Utility Tools",
      description: "Daily operational modules",
      tools: [
        { name: "Weather", path: "/tools/weather", icon: Cloud, status: "Live" },
        { name: "Currency", path: "/tools/currency", icon: DollarSign, status: "Live" },
        { name: "World Time", path: "/tools/world-time", icon: Clock, status: "Live" },
        { name: "Date Calculator", path: "/tools/date-calc", icon: Calendar, status: "Live" },
        { name: "Password Gen", path: "/tools/password-gen", icon: Key, status: "Live" },
      ]
    },
    {
      title: "Dev Tools",
      description: "Development and data formatting",
      tools: [
        { name: "JSON Formatter", path: "/tools/json-format", icon: FileJson, status: "Live" },
        { name: "Base64", path: "/tools/base64", icon: Hash, status: "Live" },
        { name: "URL Encode/Decode", path: "/tools/url-encode", icon: LinkIcon, status: "Live" },
        { name: "Site Info", path: "/tools/site-info", icon: Info, status: "Soon" },
      ]
    },
    {
      title: "File Tools",
      description: "Document and media processing",
      tools: [
        { name: "Text Formatter", path: "/tools/text-format", icon: Type, status: "Live" },
        { name: "Image Compress", path: "/tools/image-compress", icon: ImageIcon, status: "Soon" },
        { name: "PDF Tools", path: "/tools/pdf-tools", icon: FileText, status: "Soon" },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl w-full">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">SYSTEM MODULES</h1>
        <p className="text-muted-foreground font-mono text-lg max-w-2xl">Browse the complete directory of available tools and utilities in the CWJ platform.</p>
        <div className="h-1 w-24 bg-gradient-to-r from-[#00d4ff] to-primary rounded-full mt-6" />
      </div>

      <div className="space-y-16">
        {categories.map((category, idx) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">{category.title}</h2>
                <p className="text-sm text-muted-foreground font-mono mt-1">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.tools.map((tool, i) => (
                <Link href={tool.path} key={tool.name}>
                  <div className="glass-card p-5 rounded-xl flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all h-full relative overflow-hidden">
                    <div className="p-2.5 bg-black/40 rounded-lg text-primary group-hover:scale-110 group-hover:text-[#00d4ff] transition-all">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">{tool.name}</h3>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        tool.status === "Live" 
                          ? "border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10" 
                          : "border-primary/30 text-primary bg-primary/10"
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}