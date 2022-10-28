import { Button } from "@mui/material";
import Style from "./CustomButton.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import React from 'react';

interface ButtonProps {
  title: string;
  isLoading?: Boolean;
  buttonStyle?: string;
  isDisabled?: Boolean;
  handleButtonClick: () => void;
  children?: React.ReactNode;
}

const CustomButton = ({
  title,
  isLoading = false,
  buttonStyle,
  handleButtonClick,
  isDisabled = false,
  children = <></>,
}: ButtonProps) => {
  const handleClick = () => {
    if (isLoading) {
      return;
    }
    handleButtonClick?.();
  };

  return (
    <Button
      onClick={handleClick}
      className={`${Style.container} ${isDisabled ? Style.disabled : ""}  ${
        Style.button
      } ${buttonStyle}`}
    >
      {isLoading && (
        <CircularProgress
          color="inherit"
          sx={{
            width: "25px !important",
            height: "25px !important",
            mr: "10px",
          }}
        />
      )}
      {title}
    </Button>
  );
};
export default CustomButton;
