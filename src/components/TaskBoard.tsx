import { memo, useState } from "react";
import { Task, TaskBoard, TaskCategory, TaskCategoryId } from "../models/tasks";
import { Box } from "@mui/material";
import { TaskEditDialog } from "./TaskEditDialog";
import { TaskColumn } from "./TaskColumn";
import { TaskAddDialog } from "./TaskAddDialog";

type TaskAndCategory = {
  task: Task;
  category: TaskCategory;
};

export type TaskBoardProps = {
  board: TaskBoard;
  deleteTask: (task: Task) => void;
  modifyTask: (task: Task, categoryId: TaskCategoryId) => void;
  addTask: (task: Task, categoryId: TaskCategoryId) => void;
};

export const TaskBoardComponent = memo((props: TaskBoardProps) => {
  const [editDialogTask, setEditDialogTask] = useState<TaskAndCategory | null>(
    null
  );

  const [addDialogCategory, setAddDialogCategory] =
    useState<TaskCategory | null>(null);

  // Open dialogs.
  const handleTaskClick = (category: TaskCategory, task: Task) =>
    setEditDialogTask({ category, task });

  const handleTaskAdd = (category: TaskCategory) =>
    setAddDialogCategory(category);

  // Close dialogs.
  const handleEditDialogCancel = () => setEditDialogTask(null);
  const handleAddDialogCancel = () => setAddDialogCategory(null);

  // Make API calls.
  const handleEditDialogDelete = () => {
    props.deleteTask(editDialogTask?.task!);
    setEditDialogTask(null);
  };

  const handleEditDialogSave = (newTask: Task, categoryId: TaskCategoryId) => {
    props.modifyTask(newTask, categoryId);
    setEditDialogTask(null);
  };

  const handleAddDialogSave = (task: Task, categoryId: TaskCategoryId) => {
    props.addTask(task, categoryId);
    setAddDialogCategory(null);
  };

  return (
    <>
      <Box display="flex" height="100%">
        {props.board.ordered_categories.map((category) => {
          return (
            <TaskColumn
              key={category.category_id}
              category={category}
              onTaskClick={(task) => handleTaskClick(category, task)}
              onTaskAdd={() => handleTaskAdd(category)}
            ></TaskColumn>
          );
        })}
      </Box>

      <TaskEditDialog
        key={editDialogTask?.task.task_id + "edit"}
        open={editDialogTask != null}
        onClose={handleEditDialogCancel}
        onDelete={handleEditDialogDelete}
        onSave={handleEditDialogSave}
        categories={props.board.ordered_categories}
        category={editDialogTask?.category || null}
        task={editDialogTask?.task || null}
      ></TaskEditDialog>

      <TaskAddDialog
        key={addDialogCategory?.category_id + "add"}
        open={addDialogCategory != null}
        onClose={handleAddDialogCancel}
        onSave={handleAddDialogSave}
        categories={props.board.ordered_categories}
        category={addDialogCategory}
      ></TaskAddDialog>
    </>
  );
});
