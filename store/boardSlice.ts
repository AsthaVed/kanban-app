import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  createdAt?: number;
  updatedAt?: number; 
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardState {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

interface MovePayload {
  sourceColumnId: string;
  destColumnId: string;
  sourceIndex: number;
  destIndex: number;
}

const initialState: BoardState = {
  tasks: {},
 columns: {
  todo: {
    id: "todo",
    title: "To Do",
    taskIds: [],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    taskIds: [],
  },
  readyForTesting: {   // ✅ FIX
    id: "readyForTesting",
    title: "Ready for Testing",
    taskIds: [],
  },
  tested: {
    id: "tested",
    title: "Tested",
    taskIds: [],
  },
  completed: {         // ✅ FIX
    id: "completed",
    title: "Completed",
    taskIds: [],
  },
},

columnOrder: [
  "todo",
  "inProgress",
  "readyForTesting",
  "tested",
  "completed",
],

};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
      state.columns[task.columnId].taskIds.push(task.id);
    },

    updateTask: (
  state,
  action: PayloadAction<{
    id: string;
    title: string;
    description: string;
    updatedAt: number;
  }>
) => {
  const { id, title, description, updatedAt } = action.payload;

  if (!state.tasks[id]) return;

  state.tasks[id].title = title;
  state.tasks[id].description = description;
  state.tasks[id].updatedAt = updatedAt; // ✅ VERY IMPORTANT
},


    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const columnId = state.tasks[taskId].columnId;

      state.columns[columnId].taskIds =
        state.columns[columnId].taskIds.filter((id) => id !== taskId);

      delete state.tasks[taskId];
    },
    
    moveTask: (state, action: PayloadAction<MovePayload>) => {
      const { sourceColumnId, destColumnId, sourceIndex, destIndex } = action.payload;

      // simple guards
      if (!state.columns[sourceColumnId] || !state.columns[destColumnId]) return;

      // If moving in same column -> reorder
      if (sourceColumnId === destColumnId) {
        const taskIds = state.columns[sourceColumnId].taskIds;
        const [moved] = taskIds.splice(sourceIndex, 1);
        taskIds.splice(destIndex, 0, moved);
        return;
      }

      // moving between different columns
      const sourceTaskIds = state.columns[sourceColumnId].taskIds;
      const destTaskIds = state.columns[destColumnId].taskIds;

      const [moved] = sourceTaskIds.splice(sourceIndex, 1);
      destTaskIds.splice(destIndex, 0, moved);

      // update the task's columnId so task record stays consistent (optional but good)
      if (state.tasks[moved]) {
        state.tasks[moved].columnId = destColumnId;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = boardSlice.actions;
export default boardSlice.reducer;
