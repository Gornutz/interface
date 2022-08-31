
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)((props) => ({

    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#02172C',
    },
    [`& .${linearProgressClasses.barColorPrimary}`]: {
      borderRadius: 5,
      background: 'linear-gradient(63.51deg, #007994 33.26%, #04AC5C 100%)',
    },
  }));


const ProgressBar1 = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress
        variant="determinate"
        value={props.value}
      />
    </Box>
  );
}

export default ProgressBar1