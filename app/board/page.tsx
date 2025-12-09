"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/authSlice";
import { addTask } from "@/store/boardSlice";
import Board from "@/components/Board";
import { v4 as uuid } from "uuid";

export default function BoardPage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.userEmail);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /* ========================= AUTH PROTECTION ========================= */
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  /* ========================= MODAL STATE ========================= */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ========================= TASK FORM STATE ========================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState("todo");

  /* ========================= SEARCH & SORT ========================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  /* ========================= HANDLERS ========================= */
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleAddTask = () => {
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: uuid(),
        title,
        description,
        columnId,
        createdAt: Date.now(), // ✅ sorting ke liye
      })
    );

    setTitle("");
    setDescription("");
    setColumnId("todo");
    setIsModalOpen(false);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{email}</span>
        </h1>

        <div className="flex flex-wrap gap-3 sm:gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            <span className="text-lg">+</span> Add Task
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= SEARCH & SORT (PRO UI) ================= */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="flex-1 relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="border border-gray-300 px-4 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition cursor-pointer w-full md:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* ================= BOARD ================= */}
      <Board searchQuery={searchQuery} sortOrder={sortOrder} />

      {/* ================= ADD TASK MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-lg sm:w-[500px] rounded-xl p-6 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Add New Task
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="border border-gray-300 w-full p-2 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Column
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="readyForTesting">Ready For Testing</option>
                <option value="tested">Tested</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
