import { memo } from "react";
import { Task } from "../models/tasks";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type TaskCardProps = {
  task: Task;
  onCardClick: VoidFunction;
};

export const TaskCard = memo(({ task, onCardClick }: TaskCardProps) => {
  return (
    <>
      <Card sx={{ margin: 1 }} onClick={onCardClick}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.label}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {task.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
});
