import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onAddFeedback: () => void;
}

function Header({ onAddFeedback }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-[#fff3b0]/88 dark:bg-[#0d1b2a]/95 backdrop-blur-md border-b border-[#335c67]/15 dark:border-[#335c67]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        <div className="flex flex-col leading-none min-w-0">
          <h1 className="fame-wordmark text-[1.4rem] sm:text-[1.7rem] font-extrabold text-[#540b0e] dark:text-[#fff3b0] leading-none">
            FAME
          </h1>
          <p className="fame-acronym hidden sm:block text-[0.62rem] mt-[5px] text-[#335c67]/50 dark:text-[#fff3b0]/35 tracking-[0.06em] uppercase whitespace-nowrap">
            <span className="hl">F</span>eedback&nbsp;
            <span className="hl">A</span>nalysis&nbsp;&amp;&nbsp;
            <span className="hl">M</span>anagement&nbsp;
            <span className="hl">E</span>ngine
          </p>
        </div>
        <div className="flex items-center shrink-0">
          <ThemeToggle />
          <div className="w-px h-5 bg-[#335c67]/20 dark:bg-[#335c67]/30 mx-3 sm:mx-4" />
          <button
            onClick={onAddFeedback}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#335c67] hover:bg-[#540b0e] active:scale-95 text-white text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-[#335c67]/25 whitespace-nowrap"
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
  );
}

export default Header;