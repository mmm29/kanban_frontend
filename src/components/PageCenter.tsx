import { Box } from "@mui/material";
import { ReactNode } from "react";

type PageCenterProps = {
  children: ReactNode;
};

const PageCenter = ({ children }: PageCenterProps) => {
  return <Box className="page-center">{children}</Box>;
};

export default PageCenter;
