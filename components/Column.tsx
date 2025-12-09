"use client";

import TaskCard from "./TaskCard";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "@/store/boardSlice";
import { v4 as uuid } from "uuid";
import { RootState } from "@/store";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  displayTaskIds?: string[];
}

const Column: React.FC<ColumnProps> = ({ column, displayTaskIds }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.board.tasks);

  const handleAddTask = () => {
    const id = uuid();
    dispatch(
      addTask({
        id,
        title: "",
        description: "",
        columnId: column.id,
        createdAt: Date.now(),
      })
    );
  };

  // Render using displayTaskIds (sorted/filtered), but keep index consistent with original taskIds
  const taskIdsToRender = displayTaskIds || column.taskIds;

  return (
    <div className="w-72 bg-gray-100 p-3 rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{column.title}</h3>
        <button onClick={handleAddTask} aria-label={`Add to ${column.title}`}>
          ＋
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] p-1 ${
              snapshot.isDraggingOver ? "bg-blue-50" : ""
            }`}
          >
            {taskIdsToRender.map((taskId, index) => {
              const task = tasks[taskId];
              if (!task) return null;

              // Map index to original position for drag & drop
              const originalIndex = column.taskIds.indexOf(taskId);

              return <TaskCard key={taskId} task={task} index={originalIndex} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
