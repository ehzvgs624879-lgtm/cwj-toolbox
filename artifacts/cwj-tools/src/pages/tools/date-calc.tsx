import { useState } from "react";
import { ToolLayout } from "../../components/tool-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format, differenceInDays, differenceInYears, isValid, parseISO } from "date-fns";
import { Calendar } from "lucide-react";

export default function DateCalcTool() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const calculateDays = () => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (!isValid(d1) || !isValid(d2)) return "Invalid dates";
    const diff = Math.abs(differenceInDays(d1, d2));
    return `${diff} days`;
  };

  const calculateAge = () => {
    if (!birthdate) return null;
    const bday = new Date(birthdate);
    if (!isValid(bday)) return "Invalid date";
    const today = new Date();
    const years = differenceInYears(today, bday);
    return `${years} years old`;
  };

  return (
    <ToolLayout title="Date Calculator" description="Compute temporal differentials">
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-white tracking-widest text-sm">DAY DIFFERENTIAL</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">START DATE</label>
              <Input 
                type="date" 
                value={date1} 
                onChange={(e) => setDate1(e.target.value)}
                className="bg-black/40 border-white/10 text-white font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground tracking-widest">END DATE</label>
              <Input 
                type="date" 
                value={date2} 
                onChange={(e) => setDate2(e.target.value)}
                className="bg-black/40 border-white/10 text-white font-mono"
              />
            </div>
          </div>
          {date1 && date2 && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <div className="text-sm font-mono text-primary mb-1 tracking-widest">DIFFERENCE</div>
              <div className="text-2xl font-bold text-white neon-glow">{calculateDays()}</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Calendar className="w-5 h-5 text-[#00d4ff]" />
            <h3 className="font-bold text-white tracking-widest text-sm">AGE CALCULATOR</h3>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground tracking-widest">BIRTHDATE</label>
            <Input 
              type="date" 
              value={birthdate} 
              onChange={(e) => setBirthdate(e.target.value)}
              className="bg-black/40 border-white/10 text-white font-mono"
            />
          </div>
          {birthdate && (
            <div className="p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-center">
              <div className="text-sm font-mono text-[#00d4ff] mb-1 tracking-widest">CURRENT AGE</div>
              <div className="text-2xl font-bold text-white neon-glow">{calculateAge()}</div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}