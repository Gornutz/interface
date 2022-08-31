import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Slider,
  } from "@mui/material";
  import Button from "../../../components/UI/Button/Button";
  import Style from "./depositModal.module.scss";
  import { useState } from "react";
  import CustomButton from "../../../components/UI/customButton/customButton";
  const DepositModal = ({ handleButtonClick }: DepositModalProps) => {
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
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={collateral}
                onChange={handleCollateralChange}
              >
                <FormControlLabel
                  value="ICHI"
                  color="secondary"
                  control={<Radio sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#05A06B',
                      'svg:first-of-type': {
                        color: '#fff'
                      }
                    },
                  }}/>}
                  label={<span style={{color: collateral == "ICHI" ? "#fff" : "#8D97A0"}}>ICHI</span>}
                />
                <input type="text" disabled={collateral == "ICHI" ? false : true} className={collateral == "ICHI" ? "" : Style.inputDisabled} />
  
                <FormControlLabel
                  value="USDC"
                  color="secondary"
                  control={<Radio sx={{
                    color: '#fff',
                    marginLeft: '10px',
                    '&.Mui-checked': {
                      color: '#05A06B',
                      'svg:first-of-type': {
                        color: '#fff'
                      }
                    },
                  }}/>}
                  label={<span style={{color: collateral == "USDC" ? "#fff" : "#8D97A0"}}>USDC</span>}
                />
                <input type="text" disabled={collateral == "USDC" ? false : true} className={collateral == "USDC" ? "" : Style.inputDisabled} />
              </RadioGroup>
            </FormControl>
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
          title={"Deposit"}
          buttonStyle={`mt-4 ${Style.button}`}
          handleButtonClick={handleSuccessPosition}
        />
      </div>
    );
  };
  export default DepositModal;
  
  interface DepositModalProps {
    handleButtonClick: (value:string) => void;
  }
  