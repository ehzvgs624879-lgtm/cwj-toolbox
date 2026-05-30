import { useState } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextFormatTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const transform = (type: string) => {
    let result = input;
    switch (type) {
      case "UPPER":
        result = input.toUpperCase();
        break;
      case "LOWER":
        result = input.toLowerCase();
        break;
      case "TITLE":
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
    }
    setOutput(result);
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  return (
    <ToolLayout title="Text Processor" description="String manipulation and metrics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground tracking-widest">INPUT</label>
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] bg-black/40 border-white/10 text-white font-mono resize-y"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground tracking-widest">OUTPUT</label>
            <Textarea 
              value={output}
              readOnly
              className="min-h-[200px] bg-black/60 border-white/10 text-[#00d4ff] font-mono resize-y"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono text-muted-foreground tracking-widest mb-4">TRANSFORMS</h3>
            <Button onClick={() => transform("UPPER")} variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">UPPERCASE</Button>
            <Button onClick={() => transform("LOWER")} variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">lowercase</Button>
            <Button onClick={() => transform("TITLE")} variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">Title Case</Button>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono text-muted-foreground tracking-widest mb-4">METRICS</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-muted-foreground">WORDS</span>
              <span className="text-lg font-bold text-white neon-glow">{wordCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-muted-foreground">CHARS</span>
              <span className="text-lg font-bold text-white neon-glow">{charCount}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}