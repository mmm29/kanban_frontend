import { memo } from "react";
import { Task, TaskCategory } from "../models/tasks";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  category: TaskCategory;
  onTaskClick: (task: Task) => void;
  onTaskAdd: VoidFunction;
};

export const TaskColumn = memo((props: TaskColumnProps) => {
  const { category, onTaskClick, onTaskAdd } = props;

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        margin: 2,
        padding: 1,
        maxWidth: "20%",
        borderRadius: "15px",
      }}
    >
      <Stack
        spacing={1}
        direction="column"
        sx={{ alignItems: "stretch", justifyContent: "flex-start" }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {props.category.label}
        </Typography>

        <Divider orientation="horizontal" flexItem />

        {category.ordered_tasks.map((task) => (
          <TaskCard
            key={task.task_id}
            task={task}
            onCardClick={() => onTaskClick(task)}
          ></TaskCard>
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1 }}></Box>
      <Divider orientation="horizontal" flexItem />

      <Button sx={{ marginTop: 1 }} onClick={onTaskAdd}>
        Add new card
      </Button>
    </Paper>
  );
});
