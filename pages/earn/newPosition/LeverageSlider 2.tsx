import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 100,
    label: '3',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export default function LeverageSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={3}
        valueLabelDisplay="auto"
        marks={marks}
        color="secondary"
      />
    </Box>
  );
}
