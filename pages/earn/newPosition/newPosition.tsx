import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import Button from "../../../components/UI/Button/Button";
import Style from "./newPosition.module.scss";
import LeverageSlider from "./LeverageSlider";
import { useState } from "react";
import CustomButton from "../../../components/UI/customButton/customButton";
const NewPosition = ({ handleButtonClick }: NewPositionProps) => {
  // const [type, setValue]=useState(0)
  // const handleType = () => {
  //     setValue('success')
  // }
  const handleSuccessPosition = () => {
    handleButtonClick?.("success-position");
  };

  return (
    <div className="mt-5">
      <div className={Style.topContainer}>
        <h5 className={`text-white ${Style.title}`}>ICHI-USDC LP </h5>
        <div className={Style.rightContainer}>
          <div className={`${Style.rightSubContainer} mx-5`}>
            <span className={`${Style.text1}`}>Pool Ratio</span>
            <span className={`text-white  ${Style.text2}`}>
              70% ICHI / 30% USDC
            </span>
          </div>
          <div className={Style.rightSubContainer}>
            <span className={`${Style.text1}`}>Pool APY</span>
            <span className={`text-white  ${Style.text2} ${Style.flexEnd}`}>
              35%
            </span>
          </div>
        </div>
      </div>
      <div className={`mt-5 ${Style.chooseContainer}`}>
        <div className={Style["chooseContainer-content"]}>
          <label>Choose Collateral</label>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="ICHI"
                color="secondary"
                control={<Radio />}
                label="ICHI"
              />
              <input type="text" />
              <FormControlLabel
                value="USDC"
                color="secondary"
                control={<Radio />}
                label="USDC"
              />
              <input type="text" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={` ${Style.chooseSubContainer}`}></div>

        <div className={Style["chooseContainer-content"]}>
          <label className={` ${Style.chooseSubContainerLabel}`}>
            Choose Leverage
          </label>
          <LeverageSlider />
        </div>
      </div>

      <div className={Style.bottomContainer}>
        <ul className={Style.list}>
          <li>
            <span>Total Position Value</span>{" "}
            <span className={Style.bold}>$900 ($630 ICHI / $270 USDC)</span>
          </li>
          <li>
            <span>Borrowing</span>{" "}
            <span className={Style.bold}>900 USDC ($900)</span>
          </li>
          <li>
            <span>Borrow Rate</span> <span className={Style.bold}>5%</span>
          </li>
          <li>
            <span>Net APY</span> <span className={Style.bold}>90%</span>
          </li>
        </ul>

        <div className={Style.bottomContainerRight}>
          <h6>Expected Weekly Earnings</h6>
          <h3>$19.03</h3>
        </div>
      </div>
      <CustomButton
        title={"Open Positon"}
        buttonStyle={`mt-4 ${Style.button}`}
        handleButtonClick={handleSuccessPosition}
      />
    </div>
  );
};
export default NewPosition;

interface NewPositionProps {
  handleButtonClick: (value:string) => void;
}
