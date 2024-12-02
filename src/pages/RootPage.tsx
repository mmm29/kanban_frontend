import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthProvider";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { TaskBoardContainer } from "../components/TaskBoardContainer";

const RootPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => navigate("/logout");

  if (user == null) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh">
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tasks
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ padding: 4, flexGrow: 1 }}>
          <TaskBoardContainer />
        </Box>
      </Box>
    </>
  );
};

export default RootPage;
