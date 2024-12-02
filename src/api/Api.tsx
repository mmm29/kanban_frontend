import { createContext, useContext } from "react";
import { User } from "../models/users";
import { Task, TaskBoard, TaskCategoryId, TaskId } from "../models/tasks";

export interface ApiResponse<T> {
  error_code: string;
  data: T | null;
}

export interface Api {
  login(username: string, password: string): Promise<ApiResponse<User>>;
  register(username: string, password: string): Promise<ApiResponse<User>>;
  logout(): Promise<void>;
  getUser(): Promise<ApiResponse<User>>;

  fetchTasks(): Promise<ApiResponse<TaskBoard>>;
  createTask(
    label: string,
    description: string,
    categoryId: TaskCategoryId
  ): Promise<ApiResponse<Task>>;
  modifyTask(
    task_id: TaskId,
    category_id: TaskCategoryId,
    label: string,
    description: string
  ): Promise<ApiResponse<void>>;
  deleteTask(task_id: TaskId): Promise<ApiResponse<void>>;
}

export const ApiContext = createContext<Api | null>(null);

export const useApi = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return context;
};
