"use client";

import React, { useState } from "react";

interface TaskModalProps {
  task: any;
  onClose: () => void;
  onSave: (updatedTask: {
    title: string;
    description: string;
    updatedAt: number;
  }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    onSave({
      title,
      description,
      updatedAt: Date.now(), // ✅ now valid
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

        <input
          className="border p-2 rounded w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="border p-2 rounded w-full mb-4"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
