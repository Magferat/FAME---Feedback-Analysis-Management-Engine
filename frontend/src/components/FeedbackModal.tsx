
import { useState } from "react";
import { createFeedback } from "../services/api";
import { sendTeamEmail } from "../services/emailService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  config: any;
}

const FeedbackModal = ({ onClose, onSuccess, config }: Props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      if (!config) {
        console.warn("Config not loaded yet");
      }
      
      const result = await createFeedback({ name, message });
      console.log("Feedback created:", result.data);
      
      if (config) {
        console.log("Sending email to team:", result.data.team);
        await sendTeamEmail(result.data, config);
        console.log("Email sent successfully");
      } else {
        console.warn("Config not available, skipping email");
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating feedback:", error);
      alert("Error submitting feedback. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 dark:focus:border-indigo-500 transition";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500" />

        <div className="p-6">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
                New Feedback
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Your input helps us improve.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Form — backend untouched */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Feedback
              </label>
              <textarea
                placeholder="Share your thoughts…"
                className={`${inputCls} resize-none h-28`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 active:scale-95 rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;