import { useState } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileJson, AlertCircle } from "lucide-react";

export default function JsonFormatTool() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "Formatted JSON has been copied.",
    });
  };

  return (
    <ToolLayout title="Data Formatter" description="JSON parsing and validation">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col h-full space-y-2">
          <label className="text-xs font-mono text-muted-foreground tracking-widest flex items-center justify-between">
            RAW INPUT
            <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => setInput("")}>CLEAR</Button>
          </label>
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="flex-1 bg-black/40 border-white/10 text-white font-mono text-sm resize-none"
          />
          <Button 
            onClick={formatJson} 
            className="bg-primary hover:bg-primary/80 text-white font-bold tracking-widest"
          >
            <FileJson className="w-4 h-4 mr-2" />
            FORMAT
          </Button>
        </div>

        <div className="flex flex-col h-full space-y-2">
          <label className="text-xs font-mono text-muted-foreground tracking-widest flex items-center justify-between">
            FORMATTED OUTPUT
            <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={copyToClipboard} disabled={!output}>
              <Copy className="w-3 h-3 mr-1" /> COPY
            </Button>
          </label>
          <div className="flex-1 relative rounded-md border border-white/10 bg-black/60 overflow-hidden">
            {error ? (
              <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-destructive text-center">
                <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                <span className="font-mono text-sm">SYNTAX ERROR</span>
                <span className="font-mono text-xs opacity-70 mt-1">{error}</span>
              </div>
            ) : (
              <Textarea 
                value={output}
                readOnly
                className="w-full h-full bg-transparent border-0 text-[#00d4ff] font-mono text-sm resize-none focus-visible:ring-0"
              />
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}