import { useState, useEffect } from "react";
import { ToolLayout } from "../../components/tool-layout";

const CITIES = [
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Beijing", tz: "Asia/Shanghai" },
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "São Paulo", tz: "America/Sao_Paulo" }
];

export default function WorldTimeTool() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  const formatDate = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <ToolLayout title="Global Sync" description="Synchronized timezone tracking">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CITIES.map(city => (
          <div key={city.name} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 transition-colors">
            <div className="text-xs font-mono text-muted-foreground tracking-widest mb-4 uppercase">{city.name}</div>
            <div className="text-2xl font-mono text-white tracking-tighter neon-glow mb-1">
              {formatTime(time, city.tz)}
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              {formatDate(time, city.tz)}
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}