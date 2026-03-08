import type { Feedback } from "../types/feedback";

const priorityConfig: Record<string, { dot: string; text: string }> = {
  High:   { dot: "bg-[#9e2a2b]", text: "text-[#9e2a2b] dark:text-[#c94040]" },
  Medium: { dot: "bg-[#e09f3e]", text: "text-[#b07020] dark:text-[#e09f3e]" },
  Low:    { dot: "bg-[#335c67]", text: "text-[#335c67] dark:text-[#5a9aaa]" },
};

const sentimentConfig: Record<string, { bg: string }> = {
  Positive: { bg: "bg-[#335c67]/12 text-[#335c67] dark:bg-[#335c67]/30 dark:text-[#5a9aaa]" },
  Negative: { bg: "bg-[#9e2a2b]/10 text-[#9e2a2b] dark:bg-[#9e2a2b]/25 dark:text-[#c94040]" },
  Neutral:  { bg: "bg-[#e09f3e]/15 text-[#7a5a10] dark:bg-[#e09f3e]/15 dark:text-[#e09f3e]" },
};

interface FeedbackCardProps {
  fb: Feedback;
}

function FeedbackCard({ fb }: FeedbackCardProps) {
  const p = priorityConfig[fb.priority] ?? { dot: "bg-[#e09f3e]", text: "text-[#e09f3e]" };
  const s = sentimentConfig[fb.sentiment] ?? { bg: "bg-[#e09f3e]/15 text-[#7a5a10]" };

  return (
    <div className="group relative bg-white dark:bg-[#1a2a3a]/80 border border-[#335c67]/15 dark:border-[#335c67]/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-[1px]">
      <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${p.dot}`} />
      <div className="pl-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="font-semibold text-[#1a1a2e] dark:text-[#fff3b0] text-base leading-snug">
            {fb.name}
          </h2>
          <span className={`text-xs font-semibold tracking-wide ${p.text} shrink-0`}>
            {fb.priority}
          </span>
        </div>
        <p className="text-[#335c67]/60 dark:text-[#fff3b0]/50 text-sm leading-relaxed mb-3 line-clamp-2">
          {fb.message}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="px-2.5 py-1 rounded-full bg-[#335c67]/10 text-[#335c67] dark:bg-[#335c67]/30 dark:text-[#5a9aaa]">
            {fb.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full ${s.bg}`}>
            {fb.sentiment}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#e09f3e]/12 text-[#b07020] dark:bg-[#e09f3e]/20 dark:text-[#e09f3e]">
            {fb.team}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;