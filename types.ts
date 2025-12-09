export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
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