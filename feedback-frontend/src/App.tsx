import { useEffect, useState } from "react";
import { fetchFeedbacks } from "./services/api";
import type { Feedback } from "./types/feedback";
import FeedbackModal from "./components/FeedbackModal";
import { saveConfig } from "./services/api";

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

const handleSaveEmails = async () => {


  await saveConfig({
    supportEmail,
    salesEmail,
    engineeringEmail,
    
  });
  

  alert("Emails saved!");
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
  }, [nameFilter, categoryFilter, priorityFilter, ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          FAME
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Feedback
        </button>
      </div>

      

      {/* LIST */}

 <div className="grid md:grid-cols-3 gap-6">

  {/* LEFT SIDE - FEEDBACK LIST (2 columns wide) */}
  <div className="md:col-span-2">

    <div className="grid gap-4">
      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <select
          className="border p-2 rounded"
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
          className="border p-2 rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
      </div>
      {paginatedFeedbacks.map((fb) => (
        <div
          key={fb._id}
          className="bg-white p-4 rounded-xl shadow"
        >
          <h2 className="font-semibold text-lg">
            {fb.name}
          </h2>

          <p className="text-gray-600">{fb.message}</p>

          <div className="mt-2 text-sm flex gap-3 flex-wrap">
            <span className="px-2 py-1 bg-gray-200 rounded">
              {fb.category}
            </span>

            <span className="px-2 py-1 bg-blue-200 rounded">
              {fb.priority}
            </span>
            <span className="px-2 py-1 bg-green-200 rounded">
              {fb.sentiment}
            </span>
            <span className="px-2 py-1 bg-yellow-200 rounded">
              {fb.team}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* PAGINATION */}
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>


  {/* RIGHT SIDE - ADMIN PANEL */}
  <div className="space-y-6">

    {/* TEAM EMAIL CONFIG */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">
        Team Email Configuration
      </h2>

      <input
        placeholder="Support Team Email"
        className="border p-2 rounded w-full mb-2"
        value={supportEmail}
        onChange={(e) => setSupportEmail(e.target.value)}
       />

       <input
        placeholder="Sales Team Email"
        className="border p-2 rounded w-full mb-2"
        value={salesEmail}
        onChange={(e) => setSalesEmail(e.target.value)} 
      />

      <input
        placeholder="Engineering Team Email"
        className="border p-2 rounded w-full mb-2"
        value={engineeringEmail}
        onChange={(e) => setEngineeringEmail(e.target.value)}
      />

      
      <button
  onClick={handleSaveEmails}
  className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
>
  Save Emails
</button>
    </div>


    {/* ANALYTICS */} 
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">
        Analytics
      </h2>

      <p>Total Feedbacks: {feedbacks.length}</p>
      <h6>Priority</h6>
      <p>

        High: {
          feedbacks.filter(f => f.priority === "High").length
        } 
        Medium: {
          feedbacks.filter(f => f.priority === "Medium").length
        } 
        Low: {
          feedbacks.filter(f => f.priority === "Low").length
        }
      </p>
      <h6>Category</h6>
      <p>
        Technical: {
          feedbacks.filter(f => f.category === "Technical").length
        }
        Billing: {
          feedbacks.filter(f => f.category === "Billing").length
        }
        General: {
          feedbacks.filter(f => f.category === "General").length
        }
        Feature Request: {
          feedbacks.filter(f => f.category === "Feature Request").length
        }
        Complaint: {
          feedbacks.filter(f => f.category === "Complaint").length
        }
      </p>
    </div>

  </div>

</div>

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