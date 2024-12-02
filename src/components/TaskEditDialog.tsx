import { ChangeEvent, useState } from "react";
import { Task, TaskCategory, TaskCategoryId } from "../models/tasks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

export type TaskEditDialogPros = {
  open: boolean;
  onClose: VoidFunction;
  onDelete: VoidFunction;
  onSave: (newTask: Task, categoryId: TaskCategoryId) => void;
  categories: TaskCategory[];
  category: TaskCategory | null;
  task: Task | null;
};

export const TaskEditDialog = (props: TaskEditDialogPros) => {
  const { open, onClose, onDelete, onSave, categories, category, task } = props;

  const [taskLabel, setTaskLabel] = useState(task?.label);
  const [taskDescription, setTaskDescription] = useState(task?.description);
  const [taskCategoryId, setTaskCategoryId] = useState(
    category?.category_id || ""
  );

  const handleSave = () => {
    if (task == null) {
      throw Error("task has to be set");
    }

    onSave(
      {
        task_id: task.task_id,
        label: taskLabel || "",
        description: taskDescription || "",
      },
      taskCategoryId
    );
  };

  const handleDelete = () => onDelete();

  const handleTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleCategorySelect = (e: SelectChangeEvent) => {
    setTaskCategoryId(e.target.value);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit task</DialogTitle>

      <DialogContent dividers>
        <Stack
          spacing={1}
          direction="column"
          sx={{ alignItems: "stretch", justifyContent: "flex-start" }}
        >
          <Select
            labelId="category-select-label"
            id="category-select"
            value={taskCategoryId}
            label="Category"
            onChange={handleCategorySelect}
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>

          <TextField
            variant="standard"
            label="Label"
            name="label"
            value={taskLabel}
            onChange={handleTaskLabelChange}
          />

          <TextField
            variant="standard"
            multiline
            rows={4}
            label="Description"
            name="description"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete card</Button>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
};
