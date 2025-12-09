"use client";

import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/store/boardSlice";
import { useState } from "react";
import TaskModal from "./TaskModal";
import { Trash2 } from "lucide-react";

interface TaskCardProps {
  task: any;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="group bg-white p-4 sm:p-3 xs:p-2 rounded-lg mb-3 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer relative w-full"
            onClick={() => setModalOpen(true)}
          >
            <p className="font-semibold text-sm sm:text-sm xs:text-xs text-gray-800 break-words">
              {task.title || "Untitled task"}
            </p>
            <p className="text-xs sm:text-xs xs:text-[10px] text-gray-500 mt-1 break-words">
              {task.description || "No description"}
            </p>

            {/* Delete Button */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-100 transition">
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-100 rounded text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {modalOpen && (
        <TaskModal
          task={task}
          onClose={() => setModalOpen(false)}
          onSave={(updatedTask) =>
            dispatch(updateTask({ id: task.id, ...updatedTask }))
          }
        />
      )}
    </>
  );
};

export default TaskCard;
