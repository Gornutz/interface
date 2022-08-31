import { Button } from "@mui/material";
import Style from "./customButton.module.scss";

const CustomButton = ({
  title,
  isLoading = false,
  buttonStyle,
  handleButtonClick,
  isDisabled = false,
  children = <></>,
}: ButtonProps) => {
  const handleClick = () => {
    handleButtonClick?.();
  };

  return (
    <Button
      onClick={handleClick}
      className={`${Style.container} ${
        isDisabled ? Style.disabled : ""
      }  ${Style.button} ${buttonStyle}`}
    >
      {title}
    </Button>
  );
};
export default CustomButton;

interface ButtonProps {
  title: string;
  isLoading?: Boolean;
  buttonStyle?: string;
  isDisabled?: Boolean;
  handleButtonClick: () => void;
  children?: React.ReactNode;
}
