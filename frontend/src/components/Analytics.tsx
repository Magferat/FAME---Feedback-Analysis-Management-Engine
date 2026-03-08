import type { Feedback } from "../types/feedback";

interface AnalyticsProps {
  feedbacks: Feedback[];
  supportEmail: string;
  setSupportEmail: (email: string) => void;
  salesEmail: string;
  setSalesEmail: (email: string) => void;
  engineeringEmail: string;
  setEngineeringEmail: (email: string) => void;
  handleSaveEmails: () => void;
  saved: boolean;
}

const CATEGORIES = ["Technical", "Billing", "General", "Feature Request", "Complaint"] as const;
const PRIORITIES = ["High", "Medium", "Low"] as const;

const PRIORITY_COLORS = {
  High:   { bar: "bg-[#c94040]", dot: "bg-[#c94040]", text: "text-[#c94040]",                     pill: "bg-[#9e2a2b]/12 dark:bg-[#9e2a2b]/30" },
  Medium: { bar: "bg-[#e09f3e]", dot: "bg-[#e09f3e]", text: "text-[#b07020] dark:text-[#e09f3e]", pill: "bg-[#e09f3e]/12 dark:bg-[#e09f3e]/20" },
  Low:    { bar: "bg-[#5a9aaa]", dot: "bg-[#5a9aaa]", text: "text-[#335c67] dark:text-[#5a9aaa]", pill: "bg-[#335c67]/10 dark:bg-[#335c67]/25" },
};

function PriorityBreakdownRow({
  priority, counts, total, grandTotal,
}: { priority: "High" | "Medium" | "Low"; counts: Record<string, number>; total: number; grandTotal: number }) {
  const c = PRIORITY_COLORS[priority];
  const pct = grandTotal > 0 ? Math.round((total / grandTotal) * 100) : 0;
  return (
    <div className={`rounded-xl px-3 py-2.5 ${c.pill}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
          <span className={`text-xs font-bold ${c.text}`}>{priority}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-[#1a1a2e] dark:text-[#fff3b0] tabular-nums">{total}</span>
          <span className="text-[10px] text-[#335c67]/40 dark:text-[#fff3b0]/30">({pct}%)</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {CATEGORIES.map(cat => counts[cat] > 0 && (
          <div key={cat} className="flex items-center gap-1">
            <span className="text-[10px] text-[#335c67]/60 dark:text-[#fff3b0]/45">{cat.split(" ")[0]}</span>
            <span className="text-[10px] font-semibold text-[#1a1a2e] dark:text-[#fff3b0]/70">{counts[cat]}</span>
          </div>
        ))}
        {Object.values(counts).every(v => v === 0) && (
          <span className="text-[10px] text-[#335c67]/30 dark:text-[#fff3b0]/25 italic">No items</span>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30 transition";

function Analytics({
  feedbacks,
  supportEmail, setSupportEmail,
  salesEmail, setSalesEmail,
  engineeringEmail, setEngineeringEmail,
  handleSaveEmails, saved,
}: AnalyticsProps) {
  const total = feedbacks.length;

  const priCounts = Object.fromEntries(
    PRIORITIES.map(pri => [
      pri,
      Object.fromEntries(
        CATEGORIES.map(cat => [
          cat,
          feedbacks.filter(f => f.priority === pri && f.category === cat).length,
        ])
      ),
    ])
  ) as Record<string, Record<string, number>>;

  const priorityTotals = Object.fromEntries(
    PRIORITIES.map(p => [p, feedbacks.filter(f => f.priority === p).length])
  );

  return (
    <aside className="space-y-4 sm:space-y-5 order-2">
      {/* Team Emails */}
      <div className="bg-white dark:bg-[#1a2a3a]/80 border border-[#335c67]/15 dark:border-[#335c67]/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="text-xs font-semibold text-[#335c67] dark:text-[#5a9aaa] uppercase tracking-widest mb-3">
          Team Emails
        </h2>
        <div className="space-y-2.5">
          <input placeholder="Support team email"     className={inputCls} value={supportEmail}     onChange={e => setSupportEmail(e.target.value)} />
          <input placeholder="Sales team email"       className={inputCls} value={salesEmail}       onChange={e => setSalesEmail(e.target.value)} />
          <input placeholder="Engineering team email" className={inputCls} value={engineeringEmail} onChange={e => setEngineeringEmail(e.target.value)} />
        </div>
        <button
          onClick={handleSaveEmails}
          className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            saved
              ? "bg-[#335c67]/15 text-[#335c67] dark:bg-[#335c67]/25 dark:text-[#5a9aaa]"
              : "bg-[#335c67] hover:bg-[#540b0e] text-white shadow-sm"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Emails"}
        </button>
      </div>

      {/* Analytics */}
      <div className="bg-white dark:bg-[#1a2a3a]/80 border border-[#335c67]/15 dark:border-[#335c67]/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="text-xs font-semibold text-[#335c67] dark:text-[#5a9aaa] uppercase tracking-widest mb-4">
          Analytics
        </h2>

        <div className="flex items-center justify-center mb-4">
          <div>
            <p className="text-4xl font-bold text-[#1a1a2e] text-center dark:text-[#fff3b0] leading-none">{total}</p>
            <p className="text-[10px] text-[#335c67]/45 dark:text-[#fff3b0]/30 mt-1 tracking-wide uppercase">Total Feedbacks</p>
          </div>
          
        </div>

        <div>
          <p className="text-[10px] font-bold text-[#335c67]/45 dark:text-[#fff3b0]/30 uppercase tracking-widest mb-2.5">
            By Priority
          </p>
          <div className="space-y-2">
            {PRIORITIES.map(p => (
              <PriorityBreakdownRow
                key={p}
                priority={p}
                counts={priCounts[p]}
                total={priorityTotals[p]}
                grandTotal={total}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Analytics;