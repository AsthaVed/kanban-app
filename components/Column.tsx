"use client";

import TaskCard from "./TaskCard";

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/store/boardSlice";
import { v4 as uuid } from "uuid";
// import TaskCard from "./TaskCard/TaskCard";
import { RootState } from "@/store";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

const Column: React.FC<ColumnProps> = ({ column }) => {
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
      })
    );
  };

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
            className={`min-h-[200px] p-1 ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
          >
            {column.taskIds.map((taskId: string, index: number) => (
              <TaskCard key={taskId} task={tasks[taskId]} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
