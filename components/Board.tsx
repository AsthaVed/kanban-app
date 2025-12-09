"use client";

import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Column from "./Column";
import { moveTask } from "@/store/boardSlice";

interface BoardProps {
  searchQuery: string;
  sortOrder: "newest" | "oldest";
}

const Board: React.FC<BoardProps> = ({ searchQuery, sortOrder }) => {
  const columns = useSelector((state: RootState) => state.board.columns);
  const columnOrder = useSelector((state: RootState) => state.board.columnOrder);
  const tasks = useSelector((state: RootState) => state.board.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        sourceColumnId: source.droppableId,
        destColumnId: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      })
    );
  };

  const getFilteredSortedTasks = (taskIds: string[]) => {
    let list = taskIds.map((id) => tasks[id]).filter(Boolean);

    if (searchQuery) {
      list = list.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    list.sort((a, b) => {
      const aDate = a.createdAt ?? 0;
      const bDate = b.createdAt ?? 0;
      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });

    return list;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap gap-4 p-2 sm:p-4" style={{ marginRight: '-1rem' }}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const displayTasks = getFilteredSortedTasks(column.taskIds);
          const displayTaskIds = displayTasks.map((t) => t.id);

          return (
            <Column
              key={columnId}
              column={column}
              displayTaskIds={displayTaskIds}
              // className="flex-shrink-0 w-full sm:w-72" // responsive width
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;