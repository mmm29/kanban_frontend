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
import { ChangeEvent, useState } from "react";
import { Task, TaskCategory, TaskCategoryId } from "../models/tasks";

export type TaskAddDialogPros = {
  open: boolean;
  onClose: VoidFunction;
  onSave: (newTask: Task, category: TaskCategoryId) => void;
  categories: TaskCategory[];
  category: TaskCategory | null;
};

export const TaskAddDialog = (props: TaskAddDialogPros) => {
  const { open, onClose, onSave, categories, category } = props;

  const [taskLabel, setTaskLabel] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategoryId, setTaskCategoryId] = useState(
    category?.category_id || ""
  );

  const handleSave = () => {
    onSave(
      {
        task_id: "",
        label: taskLabel,
        description: taskDescription,
      },
      taskCategoryId
    );
  };

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
      <DialogTitle>Add new card</DialogTitle>

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
        <Button onClick={handleSave}>Add new card</Button>
      </DialogActions>
    </Dialog>
  );
};
