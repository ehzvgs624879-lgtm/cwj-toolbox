import { useState } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud, Search, Loader2 } from "lucide-react";

export default function WeatherTool() {
  const [city, setCity] = useState("San Francisco");
  const [weather, setWeather] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (targetCity: string) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(targetCity)}?format=3`);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      let text = await response.text();
      // Remove emojis based on prompt constraint "Do not use emojis anywhere in the UI"
      text = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim();
      setWeather(text);
    } catch (err) {
      setError("Could not retrieve atmospheric data for this location.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Weather Node" description="Real-time atmospheric data synchronization">
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather(city)}
              placeholder="Enter location..."
              className="pl-10 bg-black/40 border-white/10 text-white font-mono"
            />
          </div>
          <Button 
            onClick={() => fetchWeather(city)} 
            disabled={loading}
            className="bg-primary hover:bg-primary/80 text-white font-bold tracking-wider"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "SYNC"}
          </Button>
        </div>

        <div className="min-h-[120px] rounded-xl bg-black/60 border border-white/5 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {loading && (
            <div className="flex flex-col items-center text-primary">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="font-mono text-xs tracking-widest">ESTABLISHING CONNECTION...</span>
            </div>
          )}
          
          {error && (
            <div className="text-destructive font-mono text-sm text-center">
              [ERROR] {error}
            </div>
          )}

          {weather && !loading && !error && (
            <div className="text-center z-10">
              <Cloud className="w-12 h-12 text-[#00d4ff] mx-auto mb-4 opacity-50" />
              <div className="text-2xl md:text-3xl font-mono text-white tracking-tight">
                {weather}
              </div>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="text-muted-foreground font-mono text-sm">
              WAITING FOR INPUT...
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}