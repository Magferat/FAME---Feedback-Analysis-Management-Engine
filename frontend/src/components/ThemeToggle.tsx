// import { useTheme } from "./ThemeContext";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
//     >
//       {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
//     </button>
//   );
// }
import { useTheme } from "./ThemeContext";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
        border transition-all duration-200 active:scale-95
        ${isDark
          ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"}
      `}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="hidden sm:inline tracking-wide">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}