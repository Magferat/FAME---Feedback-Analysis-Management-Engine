
// import { useEffect, useState } from "react";
// import { fetchFeedbacks } from "./services/api";
// import type { Feedback } from "./types/feedback";
// import FeedbackModal from "./components/FeedbackModal";
// import { saveConfig } from "./services/api";
// import ThemeToggle from "./components/ThemeToggle";
// import Footer from "./components/Footer";

// const priorityConfig: Record<string, { dot: string; text: string }> = {
//   High:   { dot: "bg-rose-400",   text: "text-rose-600 dark:text-rose-400" },
//   Medium: { dot: "bg-amber-400",  text: "text-amber-600 dark:text-amber-400" },
//   Low:    { dot: "bg-emerald-400",text: "text-emerald-600 dark:text-emerald-400" },
// };

// const sentimentConfig: Record<string, { bg: string }> = {
//   Positive: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
//   Negative: { bg: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
//   Neutral:  { bg: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
// };

// function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
//   return (
//     <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-3 ${color}`}>
//       <span className="text-2xl font-bold leading-none">{value}</span>
//       <span className="text-xs mt-1 opacity-70 font-medium tracking-wide">{label}</span>
//     </div>
//   );
// }

// function FeedbackCard({ fb }: { fb: Feedback }) {
//   const p = priorityConfig[fb.priority] ?? { dot: "bg-gray-400", text: "text-gray-500" };
//   const s = sentimentConfig[fb.sentiment] ?? { bg: "bg-gray-100 text-gray-600" };

//   return (
//     <div className="group relative bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-[1px]">
//       {/* priority stripe */}
//       <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${p.dot}`} />

//       <div className="pl-4">
//         <div className="flex items-start justify-between gap-2 mb-1">
//           <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-snug">
//             {fb.name}
//           </h2>
//           <span className={`text-xs font-semibold tracking-wide ${p.text} shrink-0`}>
//             {fb.priority}
//           </span>
//         </div>

//         <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
//           {fb.message}
//         </p>

//         <div className="flex flex-wrap gap-2 text-xs font-medium">
//           <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
//             {fb.category}
//           </span>
//           <span className={`px-2.5 py-1 rounded-full ${s.bg}`}>
//             {fb.sentiment}
//           </span>
//           <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300">
//             {fb.team}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;
//   const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
//   const paginatedFeedbacks = feedbacks.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const [nameFilter, setNameFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [supportEmail, setSupportEmail] = useState("");
//   const [salesEmail, setSalesEmail] = useState("");
//   const [engineeringEmail, setEngineeringEmail] = useState("");
//   const [saved, setSaved] = useState(false);

//   const handleSaveEmails = async () => {
//     await saveConfig({ supportEmail, salesEmail, engineeringEmail });
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   };

//   const loadFeedbacks = async () => {
//     const res = await fetchFeedbacks({
//       name: nameFilter || undefined,
//       category: categoryFilter || undefined,
//       priority: priorityFilter || undefined,
//     });
//     setFeedbacks(res.data);
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//     loadFeedbacks();
//   }, [nameFilter, categoryFilter, priorityFilter]);

//   const counts = {
//     high:    feedbacks.filter(f => f.priority === "High").length,
//     medium:  feedbacks.filter(f => f.priority === "Medium").length,
//     low:     feedbacks.filter(f => f.priority === "Low").length,
//     tech:    feedbacks.filter(f => f.category === "Technical").length,
//     billing: feedbacks.filter(f => f.category === "Billing").length,
//     general: feedbacks.filter(f => f.category === "General").length,
//     feature: feedbacks.filter(f => f.category === "Feature Request").length,
//     complaint:feedbacks.filter(f => f.category === "Complaint").length,
//   };

//   const inputCls =
//     "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition";

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
//       {/* ── HEADER ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500&display=swap');
//         .fame-wordmark { font-family: 'Syne', sans-serif; letter-spacing: -0.04em; }
//         .fame-acronym { font-family: 'DM Sans', sans-serif; }
//         .fame-acronym .hl { color: #6366f1; font-weight: 600; }
//         .dark .fame-acronym .hl { color: #818cf8; }
//       `}</style>

//       <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
//         <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">

//           {/* WORDMARK */}
//           <div className="flex flex-col leading-none">
//             <h1 className="fame-wordmark text-[1.7rem] font-extrabold text-slate-900 dark:text-white leading-none">
//               FAME
//             </h1>
//             <p className="fame-acronym text-[0.62rem] mt-[5px] text-slate-400 dark:text-slate-500 tracking-[0.06em] uppercase">
//               <span className="hl">F</span>eedback&nbsp;
//               <span className="hl">A</span>nalysis&nbsp;&amp;&nbsp;
//               <span className="hl">M</span>anagement&nbsp;
//               <span className="hl">E</span>ngine
//             </p>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex items-center">
//             <ThemeToggle />
//             <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-4" />
//             <button
//               onClick={() => setShowModal(true)}
//               className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50"
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
//                 <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//               </svg>
//               Add Feedback
//             </button>
//           </div>

//         </div>
//       </header>

//       {/* ── BODY ── */}
//       <main className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">

//         {/* ── LEFT: FEED ── */}
//         <section className="md:col-span-2 space-y-4">

//           {/* Filters */}
//           <div className="grid grid-cols-3 gap-3">
//             <input
//               type="text"
//               placeholder="Search by name…"
//               className={inputCls}
//               value={nameFilter}
//               onChange={(e) => setNameFilter(e.target.value)}
//             />

//             <select
//               className={inputCls}
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="">All Categories</option>
//               <option value="Technical">Technical</option>
//               <option value="Billing">Billing</option>
//               <option value="General">General</option>
//               <option value="Feature Request">Feature Request</option>
//               <option value="Complaint">Complaint</option>
//             </select>

//             <select
//               className={inputCls}
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//             >
//               <option value="">All Priorities</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           {/* Cards */}
//           <div className="space-y-3">
//             {paginatedFeedbacks.length === 0 ? (
//               <div className="text-center py-16 text-slate-400 dark:text-slate-600">
//                 <p className="text-4xl mb-3">🪹</p>
//                 <p className="text-sm">No feedback found.</p>
//               </div>
//             ) : (
//               paginatedFeedbacks.map((fb) => <FeedbackCard key={fb._id} fb={fb} />)
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between pt-2">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((p) => p - 1)}
//                 className="px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
//               >
//                 ← Previous
//               </button>

//               <span className="text-sm text-slate-400 dark:text-slate-500">
//                 {currentPage} / {totalPages}
//               </span>

//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 className="px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
//               >
//                 Next →
//               </button>
//             </div>
//           )}
//         </section>

//         {/* ── RIGHT: SIDEBAR ── */}
//         <aside className="space-y-6">

//           {/* Email Config */}
//           <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm">
//             <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
//               Team Emails
//             </h2>

//             <div className="space-y-2.5">
//               <input
//                 placeholder="Support team email"
//                 className={inputCls}
//                 value={supportEmail}
//                 onChange={(e) => setSupportEmail(e.target.value)}
//               />
//               <input
//                 placeholder="Sales team email"
//                 className={inputCls}
//                 value={salesEmail}
//                 onChange={(e) => setSalesEmail(e.target.value)}
//               />
//               <input
//                 placeholder="Engineering team email"
//                 className={inputCls}
//                 value={engineeringEmail}
//                 onChange={(e) => setEngineeringEmail(e.target.value)}
//               />
//             </div>

//             <button
//               onClick={handleSaveEmails}
//               className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                 saved
//                   ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
//                   : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm"
//               }`}
//             >
//               {saved ? "✓ Saved!" : "Save Emails"}
//             </button>
//           </div>

//           {/* Analytics */}
//           <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm">
//             <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
//               Analytics
//             </h2>

//             <div className="text-center mb-5">
//               <p className="text-4xl font-bold text-slate-800 dark:text-white">{feedbacks.length}</p>
//               <p className="text-xs text-slate-400 mt-1 tracking-wide">Total Feedbacks</p>
//             </div>

//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Priority</p>
//             <div className="grid grid-cols-3 gap-2 mb-5">
//               <StatPill label="High"   value={counts.high}   color="bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300" />
//               <StatPill label="Medium" value={counts.medium} color="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300" />
//               <StatPill label="Low"    value={counts.low}    color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300" />
//             </div>

//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Category</p>
//             <div className="space-y-1.5">
//               {[
//                 { label: "Technical",       val: counts.tech },
//                 { label: "Billing",         val: counts.billing },
//                 { label: "General",         val: counts.general },
//                 { label: "Feature Request", val: counts.feature },
//                 { label: "Complaint",       val: counts.complaint },
//               ].map(({ label, val }) => (
//                 <div key={label} className="flex items-center justify-between">
//                   <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
//                   <div className="flex items-center gap-2">
//                     <div className="h-1.5 rounded-full bg-indigo-100 dark:bg-slate-700 w-20 overflow-hidden">
//                       <div
//                         className="h-full rounded-full bg-indigo-400 dark:bg-indigo-500 transition-all duration-500"
//                         style={{ width: feedbacks.length ? `${(val / feedbacks.length) * 100}%` : "0%" }}
//                       />
//                     </div>
//                     <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 w-4 text-right">{val}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </aside>
//       </main>
//       <Footer />

//       {/* MODAL */}
//       {showModal && (
//         <FeedbackModal
//           onClose={() => setShowModal(false)}
//           onSuccess={loadFeedbacks}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { fetchFeedbacks } from "./services/api";
import type { Feedback } from "./types/feedback";
import FeedbackModal from "./components/FeedbackModal";
import { saveConfig } from "./services/api";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

const priorityConfig: Record<string, { dot: string; text: string }> = {
  High:   { dot: "bg-rose-400",   text: "text-rose-600 dark:text-rose-400" },
  Medium: { dot: "bg-amber-400",  text: "text-amber-600 dark:text-amber-400" },
  Low:    { dot: "bg-emerald-400",text: "text-emerald-600 dark:text-emerald-400" },
};

const sentimentConfig: Record<string, { bg: string }> = {
  Positive: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  Negative: { bg: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
  Neutral:  { bg: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
};

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-3 ${color}`}>
      <span className="text-2xl font-bold leading-none">{value}</span>
      <span className="text-xs mt-1 opacity-70 font-medium tracking-wide">{label}</span>
    </div>
  );
}

function FeedbackCard({ fb }: { fb: Feedback }) {
  const p = priorityConfig[fb.priority] ?? { dot: "bg-gray-400", text: "text-gray-500" };
  const s = sentimentConfig[fb.sentiment] ?? { bg: "bg-gray-100 text-gray-600" };

  return (
    <div className="group relative bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-[1px]">
      {/* priority stripe */}
      <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${p.dot}`} />

      <div className="pl-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-snug">
            {fb.name}
          </h2>
          <span className={`text-xs font-semibold tracking-wide ${p.text} shrink-0`}>
            {fb.priority}
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {fb.message}
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
            {fb.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full ${s.bg}`}>
            {fb.sentiment}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300">
            {fb.team}
          </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [salesEmail, setSalesEmail] = useState("");
  const [engineeringEmail, setEngineeringEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSaveEmails = async () => {
    await saveConfig({ supportEmail, salesEmail, engineeringEmail });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const loadFeedbacks = async () => {
    const res = await fetchFeedbacks({
      name: nameFilter || undefined,
      category: categoryFilter || undefined,
      priority: priorityFilter || undefined,
    });
    setFeedbacks(res.data);
  };

  useEffect(() => {
    setCurrentPage(1);
    loadFeedbacks();
  }, [nameFilter, categoryFilter, priorityFilter]);

  const counts = {
    high:     feedbacks.filter(f => f.priority === "High").length,
    medium:   feedbacks.filter(f => f.priority === "Medium").length,
    low:      feedbacks.filter(f => f.priority === "Low").length,
    tech:     feedbacks.filter(f => f.category === "Technical").length,
    billing:  feedbacks.filter(f => f.category === "Billing").length,
    general:  feedbacks.filter(f => f.category === "General").length,
    feature:  feedbacks.filter(f => f.category === "Feature Request").length,
    complaint:feedbacks.filter(f => f.category === "Complaint").length,
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

      {/* ── FONTS + CUSTOM STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500&display=swap');
        .fame-wordmark { font-family: 'Syne', sans-serif; letter-spacing: -0.04em; }
        .fame-acronym  { font-family: 'DM Sans', sans-serif; }
        .fame-acronym .hl { color: #6366f1; font-weight: 600; }
        .dark .fame-acronym .hl { color: #818cf8; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">

          {/* WORDMARK */}
          <div className="flex flex-col leading-none min-w-0">
            <h1 className="fame-wordmark text-[1.4rem] sm:text-[1.7rem] font-extrabold text-slate-900 dark:text-white leading-none">
              FAME
            </h1>
            <p className="fame-acronym hidden sm:block text-[0.62rem] mt-[5px] text-slate-400 dark:text-slate-500 tracking-[0.06em] uppercase whitespace-nowrap">
              <span className="hl">F</span>eedback&nbsp;
              <span className="hl">A</span>nalysis&nbsp;&amp;&nbsp;
              <span className="hl">M</span>anagement&nbsp;
              <span className="hl">E</span>ngine
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center shrink-0">
            <ThemeToggle />
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-3 sm:mx-4" />
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50 whitespace-nowrap"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span className="hidden sm:inline">Add Feedback</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── BODY ── */}
      {/* On mobile: single column. On md+: 3-col grid with sidebar on right */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">

        {/* ── LEFT: FEED ── */}
        <section className="md:col-span-2 space-y-4 order-1">

          {/* Filters — stack to 1 col on mobile, 3 col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Search by name…"
              className={inputCls}
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />

            <select
              className={inputCls}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="General">General</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Complaint">Complaint</option>
            </select>

            <select
              className={inputCls}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {paginatedFeedbacks.length === 0 ? (
              <div className="text-center py-16 text-slate-400 dark:text-slate-600">
                <p className="text-4xl mb-3">🪹</p>
                <p className="text-sm">No feedback found.</p>
              </div>
            ) : (
              paginatedFeedbacks.map((fb) => <FeedbackCard key={fb._id} fb={fb} />)
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 sm:px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              <span className="text-sm text-slate-400 dark:text-slate-500">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 sm:px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          )}
        </section>

        {/* ── RIGHT: SIDEBAR ── */}
        {/* order-2 so on mobile it appears below the feed */}
        <aside className="space-y-4 sm:space-y-6 order-2">

          {/* Email Config */}
          <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
              Team Emails
            </h2>

            <div className="space-y-2.5">
              <input
                placeholder="Support team email"
                className={inputCls}
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
              <input
                placeholder="Sales team email"
                className={inputCls}
                value={salesEmail}
                onChange={(e) => setSalesEmail(e.target.value)}
              />
              <input
                placeholder="Engineering team email"
                className={inputCls}
                value={engineeringEmail}
                onChange={(e) => setEngineeringEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSaveEmails}
              className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                saved
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm"
              }`}
            >
              {saved ? "✓ Saved!" : "Save Emails"}
            </button>
          </div>

          {/* Analytics */}
          <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
              Analytics
            </h2>

            <div className="text-center mb-4 sm:mb-5">
              <p className="text-4xl font-bold text-slate-800 dark:text-white">{feedbacks.length}</p>
              <p className="text-xs text-slate-400 mt-1 tracking-wide">Total Feedbacks</p>
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Priority</p>
            {/* On mobile show as a row of 3; stays same on desktop */}
            <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-5">
              <StatPill label="High"   value={counts.high}   color="bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300" />
              <StatPill label="Medium" value={counts.medium} color="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300" />
              <StatPill label="Low"    value={counts.low}    color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300" />
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Category</p>
            <div className="space-y-1.5">
              {[
                { label: "Technical",       val: counts.tech },
                { label: "Billing",         val: counts.billing },
                { label: "General",         val: counts.general },
                { label: "Feature Request", val: counts.feature },
                { label: "Complaint",       val: counts.complaint },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400 truncate">{label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-1.5 rounded-full bg-indigo-100 dark:bg-slate-700 w-16 sm:w-20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-400 dark:bg-indigo-500 transition-all duration-500"
                        style={{ width: feedbacks.length ? `${(val / feedbacks.length) * 100}%` : "0%" }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 w-4 text-right">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </main>

      <Footer />

      {/* MODAL */}
      {showModal && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSuccess={loadFeedbacks}
        />
      )}
    </div>
  );
}

export default App;