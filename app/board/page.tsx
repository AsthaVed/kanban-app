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
      })
    );

    // reset form + close modal
    setTitle("");
    setDescription("");
    setColumnId("todo");
    setIsModalOpen(false);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{email}</span>
        </h1>

        <div className="flex gap-3">
          {/* ADD TASK BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition"
          >
            <span className="text-lg">+</span> Add Task
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= BOARD ================= */}
      <Board />

      {/* ================= ADD TASK MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[500px] rounded-xl p-6 shadow-2xl relative animate-slide-in">
            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Add New Task</h2>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows={3}
              />
            </div>

            {/* Column Selector */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Column</label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="readyForTesting">Ready For Testing</option>
                <option value="tested">Tested</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add Task
              </button>
            </div>

            {/* Close Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
