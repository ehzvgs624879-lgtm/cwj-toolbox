import { useState } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setOutput("ERROR: Invalid URL encoding");
    }
  };

  return (
    <ToolLayout title="URL Cipher" description="URL encoding and decoding">
      <div className="space-y-6">
        <div className="flex p-1 bg-black/40 rounded-lg w-fit border border-white/10">
          <Button 
            variant={mode === "encode" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("encode")}
            className={mode === "encode" ? "bg-primary text-white" : "text-muted-foreground"}
          >
            ENCODE
          </Button>
          <Button 
            variant={mode === "decode" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("decode")}
            className={mode === "decode" ? "bg-primary text-white" : "text-muted-foreground"}
          >
            DECODE
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground tracking-widest">INPUT</label>
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] bg-black/40 border-white/10 text-white font-mono resize-y"
          />
        </div>

        <Button onClick={process} className="w-full bg-primary hover:bg-primary/80">
          EXECUTE
        </Button>

        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground tracking-widest">OUTPUT</label>
          <Textarea 
            value={output}
            readOnly
            className="min-h-[150px] bg-black/60 border-white/10 text-[#00d4ff] font-mono resize-y"
          />
        </div>
      </div>
    </ToolLayout>
  );
}