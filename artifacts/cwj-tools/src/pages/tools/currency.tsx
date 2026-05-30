import { useState, useEffect } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurrencyTool() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const currencies = Object.keys(rates);

  const calculateConversion = () => {
    if (!rates[from] || !rates[to]) return "0.00";
    const baseAmount = parseFloat(amount) || 0;
    const inUSD = baseAmount / rates[from];
    return (inUSD * rates[to]).toFixed(2);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolLayout title="Currency Exchange" description="Live market conversion rates">
      {loading ? (
        <div className="flex items-center justify-center p-12 text-primary">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">AMOUNT</label>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/40 border-white/10 text-white font-mono text-lg"
              />
            </div>

            <div className="w-full space-y-2">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">FROM</label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="bg-black/40 border-white/10 text-white font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 max-h-60">
                  {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={swap}
              className="mt-6 shrink-0 bg-transparent border-white/10 hover:bg-white/5 hover:text-primary"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </Button>

            <div className="w-full space-y-2">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">TO</label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="bg-black/40 border-white/10 text-white font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 max-h-60">
                  {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-black/60 border border-white/5 text-center">
            <div className="text-sm font-mono text-muted-foreground mb-2">CONVERSION RESULT</div>
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter neon-glow">
              {calculateConversion()} <span className="text-xl text-primary">{to}</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground mt-4">
              1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}