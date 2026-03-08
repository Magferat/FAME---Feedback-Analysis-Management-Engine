import { useState, useEffect } from "react";
import type { Feedback } from "../types/feedback";
import FeedbackCard from "./FeedbackCard";

interface FeedbackListProps {
  feedbacks: Feedback[];
  nameFilter: string;
  setNameFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

function FeedbackList({
  feedbacks,
  nameFilter,
  setNameFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
}: FeedbackListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [nameFilter, categoryFilter, priorityFilter]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const inputCls =
    "w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30 transition";

  return (
    <section className="md:col-span-2 space-y-4 order-1">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        <input
          type="text"
          placeholder="Search by name…"
          className={inputCls}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <select className={inputCls} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Complaint">Complaint</option>
        </select>
        <select className={inputCls} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="space-y-3">
        {paginatedFeedbacks.length === 0 ? (
          <div className="text-center py-16 text-[#335c67]/35 dark:text-[#335c67]/40">
            <p className="text-4xl mb-3">🪹</p>
            <p className="text-sm">No feedback found.</p>
          </div>
        ) : (
          paginatedFeedbacks.map((fb) => <FeedbackCard key={fb._id} fb={fb} />)
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 sm:px-4 py-2 text-sm rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/30 bg-white dark:bg-[#1a2a3a]/70 hover:bg-[#335c67]/10 dark:hover:bg-[#335c67]/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>
          <span className="text-sm text-[#335c67]/50 dark:text-[#fff3b0]/35">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 sm:px-4 py-2 text-sm rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/30 bg-white dark:bg-[#1a2a3a]/70 hover:bg-[#335c67]/10 dark:hover:bg-[#335c67]/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}

export default FeedbackList;