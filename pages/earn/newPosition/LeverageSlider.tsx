import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function valuetext(value: number) {
  return `${value}x`;
}
const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#05A06B",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: "18px",
    fontWeight: "500",
    top: 0,
    backgroundColor: "unset",
    color: "#fff",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#fff",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    // opacity: 0.5,
    backgroundColor: "#254866",
    borderRadius: "20px",
    height: "10px",
  },
  "& .MuiSlider-markLabel": {
    color: "#fff",
    fontSize: "14px",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#376081",
    height: 10,
    width: 2,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

export default function LeverageSlider({
  marks,
  max,
  realMax,
  value,
  setValue,
}: {
  marks: any;
  max: number;
  realMax: number;
  value: number;
  setValue: (value: number) => void;
}) {
  const handleChange1 = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      return;
    }
    if (newValue > realMax) {
      newValue = realMax;
    }
    setValue(newValue);
  };
  useEffect(() => {
    setValue(value);
  }, [marks, max, realMax]);
  return (
    <Box sx={{ width: "100%" }}>
      <IOSSlider
        track={false}
        aria-label="ios slider"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        onChange={handleChange1}
        value={value}
        marks={marks}
        valueLabelDisplay="on"
        step={0.01}
        min={0}
        max={max}
      />
    </Box>
  );
}
