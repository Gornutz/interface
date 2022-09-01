import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Slider,
} from "@mui/material";

interface DepositModalProps {
  tokenName: string,
  handleButtonClick: (value:string) => void,
}

import Button from "../../../components/UI/Button/Button";
import Style from "./depositModal.module.scss";
import { useState } from "react";
import CustomButton from "../../../components/UI/customButton/customButton";
const DepositModal = ({ tokenName, handleButtonClick }: DepositModalProps) => {
  // const [type, setValue]=useState(0)
  // const handleType = () => {
  //     setValue('success')
  // }
  const [collateral, setCollateral] = useState('ICHI');
  const handleCollateralChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollateral((event.target as HTMLInputElement).value);
  };

  const handleSuccessPosition = () => {
    handleButtonClick?.("success-position");
  };

  return (
    <div className="mt-5">
      <div className={`mt-5 ${Style.chooseContainer}`}>
        <div className={Style["chooseContainer-content"]}>
          <label>Input Amount</label>
          <input type="text" disabled={collateral == "ICHI" ? false : true} className={collateral == "ICHI" ? "" : Style.inputDisabled} />
          <span className={Style.tokenLabel}>{tokenName}</span>
        </div>

      </div>

      <div className={Style.bottomContainer}>
        <ul className={Style.list}>
          <li>
            <span>Net APY</span>{" "}
            <span className={Style.bold}>90%</span>
          </li>
        </ul>

        <div className={Style.bottomContainerRight}>
          <h6>Expected Weekly Earnings</h6>
          <h3>$19.03</h3>
        </div>
      </div>
      <CustomButton
        title={"Deposit"}
        buttonStyle={`mt-4 ${Style.button}`}
        handleButtonClick={handleSuccessPosition}
      />
    </div>
  );
};
export default DepositModal;