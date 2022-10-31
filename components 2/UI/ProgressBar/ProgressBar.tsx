import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)((props) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#02172C",
  },
  [`& .${linearProgressClasses.barColorPrimary}`]: {
    borderRadius: 5,
    background: "linear-gradient(89.83deg, #0056E0 0.3%, #57C5E0 99.81%)",
  },
}));

const ProgressBar = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={props.value} />
    </Box>
  );
};

export default ProgressBar;
