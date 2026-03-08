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

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-3 ${color}`}>
      <span className="text-2xl font-bold leading-none">{value}</span>
      <span className="text-xs mt-1 opacity-65 font-medium tracking-wide">{label}</span>
    </div>
  );
}

function Analytics({ feedbacks, supportEmail, setSupportEmail, salesEmail, setSalesEmail, engineeringEmail, setEngineeringEmail, handleSaveEmails, saved }: AnalyticsProps) {
  const counts = {
    high: feedbacks.filter(f => f.priority === "High").length,
    medium: feedbacks.filter(f => f.priority === "Medium").length,
    low: feedbacks.filter(f => f.priority === "Low").length,
    tech: feedbacks.filter(f => f.category === "Technical").length,
    billing: feedbacks.filter(f => f.category === "Billing").length,
    general: feedbacks.filter(f => f.category === "General").length,
    feature: feedbacks.filter(f => f.category === "Feature Request").length,
    complaint: feedbacks.filter(f => f.category === "Complaint").length,
  };

  const inputCls =
    "w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30 transition";

  return (
    <aside className="space-y-4 sm:space-y-6 order-2">
      <div className="bg-white dark:bg-[#1a2a3a]/80 border border-[#335c67]/15 dark:border-[#335c67]/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="text-xs font-semibold text-[#335c67] dark:text-[#5a9aaa] uppercase tracking-widest mb-3 sm:mb-4">
          Team Emails
        </h2>
        <div className="space-y-2.5">
          <input placeholder="Support team email" className={inputCls} value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          <input placeholder="Sales team email" className={inputCls} value={salesEmail} onChange={(e) => setSalesEmail(e.target.value)} />
          <input placeholder="Engineering team email" className={inputCls} value={engineeringEmail} onChange={(e) => setEngineeringEmail(e.target.value)} />
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

      <div className="bg-white dark:bg-[#1a2a3a]/80 border border-[#335c67]/15 dark:border-[#335c67]/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="text-xs font-semibold text-[#335c67] dark:text-[#5a9aaa] uppercase tracking-widest mb-3 sm:mb-4">
          Analytics
        </h2>
        <div className="text-center mb-4 sm:mb-5">
          <p className="text-4xl font-bold text-[#1a1a2e] dark:text-[#fff3b0]">{feedbacks.length}</p>
          <p className="text-xs text-[#335c67]/50 dark:text-[#fff3b0]/35 mt-1 tracking-wide">Total Feedbacks</p>
        </div>

        <p className="text-xs font-semibold text-[#335c67]/50 dark:text-[#fff3b0]/35 uppercase tracking-widest mb-2">Priority</p>
        <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-5">
          <StatPill label="High" value={counts.high} color="bg-[#9e2a2b]/10 text-[#9e2a2b] dark:bg-[#9e2a2b]/25 dark:text-[#c94040]" />
          <StatPill label="Medium" value={counts.medium} color="bg-[#e09f3e]/12 text-[#b07020] dark:bg-[#e09f3e]/20 dark:text-[#e09f3e]" />
          <StatPill label="Low" value={counts.low} color="bg-[#335c67]/10 text-[#335c67] dark:bg-[#335c67]/25 dark:text-[#5a9aaa]" />
        </div>

        <p className="text-xs font-semibold text-[#335c67]/50 dark:text-[#fff3b0]/35 uppercase tracking-widest mb-2">Category</p>
        <div className="space-y-1.5">
          {[
            { label: "Technical", val: counts.tech },
            { label: "Billing", val: counts.billing },
            { label: "General", val: counts.general },
            { label: "Feature Request", val: counts.feature },
            { label: "Complaint", val: counts.complaint },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <span className="text-sm text-[#335c67]/65 dark:text-[#fff3b0]/50 truncate">{label}</span>
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-1.5 rounded-full bg-[#335c67]/12 dark:bg-[#335c67]/25 w-16 sm:w-20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#335c67] dark:bg-[#5a9aaa] transition-all duration-500"
                    style={{ width: feedbacks.length ? `${(val / feedbacks.length) * 100}%` : "0%" }}
                  />
                </div>
                <span className="text-sm font-semibold text-[#1a1a2e] dark:text-[#fff3b0] w-4 text-right">{val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Analytics;