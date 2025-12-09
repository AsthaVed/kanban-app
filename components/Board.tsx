"use client";

import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Column from "./Column";
import { moveTask } from "@/store/boardSlice";

const Board: React.FC = () => {
  const columns = useSelector((state: RootState) => state.board.columns);
  const columnOrder = useSelector((state: RootState) => state.board.columnOrder);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // dropped outside droppable

    // If nothing changed
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columnOrder.map((columnId: string) => (
          <Column key={columnId} column={columns[columnId]} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
