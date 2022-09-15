import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Style from "./newPosition.module.scss";
import LeverageSlider from "./LeverageSlider";
import { useState } from "react";
import CustomButton from "../../../components/UI/customButton/customButton";
const NewPosition = ({ handleButtonClick }: NewPositionProps) => {
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
          <p className={Style.label}>Choose Collateral</p>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={collateral}
              onChange={handleCollateralChange}
            >
              <div>
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
                  label={<p style={{color: collateral == "ICHI" ? "#fff" : "#8D97A0", width: '42px'}}>ICHI</p>}
                />
                <input type="text" className={collateral == "ICHI" ? "" : Style.inputDisabled} onClick={() => setCollateral("ICHI")} />
              </div>

              <div className={Style.formControl}>
                <FormControlLabel
                  value="USDC"
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
                  label={<p style={{color: collateral == "USDC" ? "#fff" : "#8D97A0", width: '42px'}}>USDC</p>}
                />
                <input type="text" className={collateral == "USDC" ? "" : Style.inputDisabled} onClick={() => setCollateral("USDC")} />
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div className={` ${Style.chooseSubContainer}`}></div>

        <div className={Style["chooseContainer-content"]}>
          <p className={`${Style.label} ${Style.chooseSubContainerLabel}`}>
            Choose Leverage
          </p>
          {
            collateral == "USDC" ? (
              <LeverageSlider
                marks={[
                  {
                    value: 0,
                    label: '0x',
                  },
                  {
                    value: 1,
                    label: '1x',
                  },
                  {
                    value: 3,
                    label: '3x',
                  },
                ]}
                max={3}
                realMax={3}
              />
            ) : (
              <LeverageSlider
                marks={[
                  {
                    value: 0,
                    label: '0x',
                  },
                  {
                    value: 1,
                    label: '1x',
                  },
                  {
                    value: 1.5,
                    label: '1.5x',
                  },
                  {
                    value: 3,
                    label: '3x',
                  },
                ]}
                max={3}
                realMax={1.5}
              />
            )
          }
        </div>
      </div>

      <div className={Style.bottomContainer}>
        <ul className={Style.list}>
          <li>
            <span>Total Position Value</span>{" "}
            <p className={Style.bold}>$900 ($630 ICHI / $270 USDC)</p>
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
