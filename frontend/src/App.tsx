

import { useEffect, useState, useCallback } from "react";
import { fetchFeedbacks } from "./services/api";
import type { Feedback } from "./types/feedback";
import FeedbackModal from "./components/FeedbackModal";
import { saveConfig, getConfig } from "./services/api";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";

interface Config {
  supportEmail: string;
  salesEmail: string;
  engineeringEmail: string;
}

function App() {
  const [allFeedbacks, setAllFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [salesEmail, setSalesEmail] = useState("");
  const [engineeringEmail, setEngineeringEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSaveEmails = async () => {
    const newConfig = { supportEmail, salesEmail, engineeringEmail };
    try {
      await saveConfig(newConfig);
      setConfig(newConfig);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save config:", err);
    }
  };

  const loadAllFeedbacks = useCallback(async () => {
    const res = await fetchFeedbacks({});
    setAllFeedbacks(res.data);
  }, []);

  const loadFilteredFeedbacks = useCallback(async () => {
    const filters = {
      name: nameFilter || undefined,
      category: categoryFilter || undefined,
      priority: priorityFilter || undefined,
    };
    const res = await fetchFeedbacks(filters);
    setFilteredFeedbacks(res.data);
  }, [nameFilter, categoryFilter, priorityFilter]);

  useEffect(() => {
    const fetchInitialFeedbacks = async () => {
      await loadAllFeedbacks();
      await loadFilteredFeedbacks();
    };
    fetchInitialFeedbacks();
  }, [loadAllFeedbacks, loadFilteredFeedbacks]);

  useEffect(() => {
    loadFilteredFeedbacks();
  }, [loadFilteredFeedbacks]);

  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await getConfig();
        const data = res.data;
        setConfig(data);
        if (data) {
          setSupportEmail(data.supportEmail || "");
          setSalesEmail(data.salesEmail || "");
          setEngineeringEmail(data.engineeringEmail || "");
        }
      } catch (error) {
        console.error("Failed to load config:", error);
      }
    };
    loadConfig();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff3b0] dark:bg-[#0d1b2a] text-[#1a1a2e] dark:text-[#fff3b0] font-sans transition-colors duration-300">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500&display=swap');
        .fame-wordmark { font-family: 'Syne', sans-serif; letter-spacing: -0.04em; }
        .fame-acronym  { font-family: 'DM Sans', sans-serif; }
        .fame-acronym .hl { color: #335c67; font-weight: 600; }
        .dark .fame-acronym .hl { color: #5a9aaa; }
      `}</style>

      <Header onAddFeedback={() => setShowModal(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
        <FeedbackList
          feedbacks={filteredFeedbacks}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <Analytics
          feedbacks={allFeedbacks}
          supportEmail={supportEmail}
          setSupportEmail={setSupportEmail}
          salesEmail={salesEmail}
          setSalesEmail={setSalesEmail}
          engineeringEmail={engineeringEmail}
          setEngineeringEmail={setEngineeringEmail}
          handleSaveEmails={handleSaveEmails}
          saved={saved}
        />
      </main>

      <Footer />

      {showModal && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            loadAllFeedbacks();
            loadFilteredFeedbacks();
          }}
          config={config}
        />
      )}
    </div>
  );
}

export default App;