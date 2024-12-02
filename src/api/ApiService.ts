import { TaskBoard, Task, TaskId, TaskCategoryId } from "../models/tasks";
import { User } from "../models/users";
import { Api, ApiResponse } from "./Api";

export class RequestError extends Error {
  status: number;

  constructor(status: number) {
    super("request error: status: " + status);

    this.status = status;
  }
}

export class ApiService implements Api {
  baseUrl: string;
  onUnauthorized: VoidFunction;

  constructor(baseUrl: string, onUnauthorized: VoidFunction) {
    this.baseUrl = baseUrl;
    this.onUnauthorized = onUnauthorized;
  }

  async login(username: string, password: string): Promise<ApiResponse<User>> {
    return await this.request_post("/login", {
      username,
      password,
    });
  }

  async register(
    username: string,
    password: string
  ): Promise<ApiResponse<User>> {
    return await this.request_post("/register", {
      username,
      password,
    });
  }

  async logout(): Promise<void> {
    await this.request_post("/logout", {});
  }

  async getUser(): Promise<ApiResponse<User>> {
    return await this.request_get("/user");
  }

  async fetchTasks(): Promise<ApiResponse<TaskBoard>> {
    return await this.request_get("/tasks");
  }

  async createTask(
    label: string,
    description: string,
    categoryId: TaskCategoryId
  ): Promise<ApiResponse<Task>> {
    return await this.request_post("/tasks", {
      label,
      description,
      categoryId,
    });
  }

  async modifyTask(
    task_id: TaskId,
    categoryId: TaskCategoryId,
    label: string,
    description: string
  ): Promise<ApiResponse<void>> {
    return await this.request_put("/tasks/" + task_id, {
      categoryId,
      label,
      description,
    });
  }

  async deleteTask(task_id: TaskId): Promise<ApiResponse<void>> {
    return await this.request_delete("/tasks/" + task_id);
  }

  async request_get<T>(path: string): Promise<ApiResponse<T>> {
    return this.request_common(() =>
      fetch(this.baseUrl + path, {
        method: "GET",
        credentials: "include",
      })
    );
  }

  async request_post<P, T>(path: string, payload: P): Promise<ApiResponse<T>> {
    return this.request_common(() =>
      fetch(this.baseUrl + path, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
  }

  async request_put<P, T>(path: string, payload: P): Promise<ApiResponse<T>> {
    return this.request_common(() =>
      fetch(this.baseUrl + path, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
  }

  async request_delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request_common(() =>
      fetch(this.baseUrl + path, {
        method: "DELETE",
        credentials: "include",
      })
    );
  }

  async request_patch<P, T>(path: string, payload: P): Promise<ApiResponse<T>> {
    return this.request_common(() =>
      fetch(this.baseUrl + path, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
  }

  async request_common<T>(
    request: () => Promise<Response>
  ): Promise<ApiResponse<T>> {
    const response = await request();

    if (!response.ok) {
      throw new RequestError(response.status);
    }

    return await response.json();
  }
}
