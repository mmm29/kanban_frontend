export type TaskId = string;

export type Task = {
  task_id: TaskId;
  label: string;
  description: string;
};

export type TaskCategoryId = string;

export type TaskCategory = {
  category_id: string;
  label: string;
  ordered_tasks: Task[];
};

export type TaskBoard = {
  ordered_categories: TaskCategory[];
};
