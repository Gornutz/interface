interface DepositModalProps {
  tokenName: string,
  handleButtonClick: (value: string) => void,
}

import Button from "../../../components/UI/Button/Button";
import Style from "./depositModal.module.scss";
import { useState } from "react";
import CustomButton from "../../../components/UI/customButton/customButton";

import { depositToken } from '../../../contracts/helper';

const DepositModal = ({ tokenName, handleButtonClick }: DepositModalProps) => {
  const [amount, setAmount] = useState('0');
  const [isLoading, setLoading] = useState(false);

  const handleSuccessPosition = async () => {
    try {
      setLoading(true)
      await depositToken(7, parseInt(amount), 3)
      handleButtonClick?.("success-position");
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div className="mt-5">
      <div className={`mt-5 ${Style.chooseContainer}`}>
        <div className={Style["chooseContainer-content"]}>
          <label>Input Amount</label>
          <input type="text" onChange={(e) => setAmount(e.target.value)} />
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
        isLoading={isLoading}
      />
    </div>
  );
};
export default DepositModal;