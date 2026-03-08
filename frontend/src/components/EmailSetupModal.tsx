interface EmailSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  supportEmail: string;
  salesEmail: string;
  engineeringEmail: string;
  onSupportEmailChange: (email: string) => void;
  onSalesEmailChange: (email: string) => void;
  onEngineeringEmailChange: (email: string) => void;
  onSave: () => void;
}

function EmailSetupModal({
  isOpen,
  onClose,
  supportEmail,
  salesEmail,
  engineeringEmail,
  onSupportEmailChange,
  onSalesEmailChange,
  onEngineeringEmailChange,
  onSave,
}: EmailSetupModalProps) {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1a2a3a] rounded-2xl p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-semibold mb-4 text-[#1a1a2e] dark:text-[#fff3b0]">Setup Team Emails</h2>
        <p className="text-sm text-[#335c67]/60 dark:text-[#fff3b0]/50 mb-4">
          Please provide email addresses for your teams to receive feedback emails.
        </p>
        <div className="space-y-3 mb-6">
          <input
            type="email"
            placeholder="Support team email"
            className="w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30"
            value={supportEmail}
            onChange={(e) => onSupportEmailChange(e.target.value)}
          />
          <input
            type="email"
            placeholder="Sales team email"
            className="w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30"
            value={salesEmail}
            onChange={(e) => onSalesEmailChange(e.target.value)}
          />
          <input
            type="email"
            placeholder="Engineering team email"
            className="w-full rounded-xl border border-[#335c67]/20 dark:border-[#335c67]/35 bg-white dark:bg-[#1a2a3a]/70 text-[#1a1a2e] dark:text-[#fff3b0] placeholder-[#335c67]/40 dark:placeholder-[#fff3b0]/30 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#335c67]/30"
            value={engineeringEmail}
            onChange={(e) => onEngineeringEmailChange(e.target.value)}
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-[#335c67] hover:bg-[#540b0e] text-white py-2.5 rounded-xl text-sm font-semibold transition"
        >
          Save Emails
        </button>
      </div>
    </div>
  );
}

export default EmailSetupModal;