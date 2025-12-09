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
      updatedAt: Date.now(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[550px] sm:max-w-[500px] xs:max-w-[90%] p-6 sm:p-4 xs:p-3">
        <h2 className="text-xl sm:text-base xs:text-sm font-semibold mb-4">
          Edit Task
        </h2>

        <input
          className="border p-2 sm:p-3 rounded w-full mb-3 text-sm sm:text-sm xs:text-xs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="border p-2 sm:p-3 rounded w-full mb-4 text-sm sm:text-sm xs:text-xs"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-sm sm:text-sm xs:text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm sm:text-sm xs:text-xs"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;