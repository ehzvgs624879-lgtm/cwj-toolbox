import { useState, useCallback } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, KeyRound, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PasswordGenTool() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generatePassword = useCallback(() => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = lower;
    if (useUppercase) chars += upper;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  }, [length, useUppercase, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied to clipboard",
      description: "Password has been copied to your clipboard.",
    });
  };

  return (
    <ToolLayout title="Security Generator" description="Cryptographic key synthesis">
      <div className="space-y-8">
        <div className="p-6 rounded-xl bg-black/60 border border-white/10 relative group">
          <div className="text-xs font-mono text-muted-foreground mb-4 tracking-widest">GENERATED HASH</div>
          <div className="text-2xl md:text-3xl font-mono text-white tracking-wider break-all neon-glow min-h-[48px]">
            {password || "PRESS_GENERATE"}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" onClick={generatePassword} className="text-white hover:text-primary">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="text-white hover:text-primary">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">LENGTH: {length}</label>
            </div>
            <Slider 
              value={length} 
              onValueChange={setLength} 
              max={64} 
              min={8} 
              step={1}
              className="py-4"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
              <label className="text-sm font-mono text-white tracking-widest">UPPERCASE [A-Z]</label>
              <Switch checked={useUppercase} onCheckedChange={setUseUppercase} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
              <label className="text-sm font-mono text-white tracking-widest">NUMBERS [0-9]</label>
              <Switch checked={useNumbers} onCheckedChange={setUseNumbers} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
              <label className="text-sm font-mono text-white tracking-widest">SYMBOLS [!@#]</label>
              <Switch checked={useSymbols} onCheckedChange={setUseSymbols} />
            </div>
          </div>

          <Button 
            onClick={generatePassword} 
            className="w-full h-12 bg-primary hover:bg-primary/80 text-white font-bold tracking-widest"
          >
            <KeyRound className="w-5 h-5 mr-2" />
            SYNTHESIZE NEW KEY
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}