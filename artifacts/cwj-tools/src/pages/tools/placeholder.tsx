import { ToolLayout } from "../../components/tool-layout";
import { Cpu } from "lucide-react";

export default function PlaceholderTool({ title }: { title: string }) {
  return (
    <ToolLayout title={title} description="Module currently under development">
      <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary blur-3xl opacity-20 rounded-full" />
          <Cpu className="w-16 h-16 text-primary relative z-10 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-widest neon-glow uppercase">COMING SOON</h2>
        <p className="text-muted-foreground font-mono text-sm tracking-widest">
          AWAITING SYSTEM INITIALIZATION...
        </p>
      </div>
    </ToolLayout>
  );
}