import { useEffect, useState } from "react";
import { Api, useApi } from "../api/Api";
import { Task, TaskBoard, TaskCategoryId } from "../models/tasks";
import { TaskBoardComponent } from "./TaskBoard";

export const TaskBoardContainer = () => {
  const api = useApi();

  const [taskBoard, setTaskBoard] = useState<TaskBoard>({
    ordered_categories: [],
  });

  const updateTasks = async (api: Api) => {
    let response = await api.fetchTasks();

    if (response.data != null) {
      setTaskBoard(response.data);
    } else {
      throw new Error("could not fetch tasks");
      // TODO: show notification
    }
  };

  useEffect(() => {
    updateTasks(api);
  }, [api]);

  const deleteTask = (task: Task) => {
    api.deleteTask(task.task_id).then(() => {
      updateTasks(api);
    });
  };

  const modifyTask = (task: Task, categoryId: TaskCategoryId) => {
    api
      .modifyTask(task.task_id, categoryId, task.label, task.description)
      .then(() => {
        updateTasks(api);
      });
  };

  const addTask = (task: Task, categoryId: TaskCategoryId) => {
    api.createTask(task.label, task.description, categoryId).then(() => {
      updateTasks(api);
    });
  };

  return (
    <TaskBoardComponent
      board={taskBoard}
      deleteTask={deleteTask}
      modifyTask={modifyTask}
      addTask={addTask}
    ></TaskBoardComponent>
  );
};
