import Style from './editPosition.module.scss'
import { useState } from "react"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material"

const EditPosition = ({handleClose}) => {
  const [collateral, setCollateral] = useState('Add');
  const handleCollateralChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollateral((event.target as HTMLInputElement).value);
  };
  const [newAmount, setNewAmount] = useState("0");

  return (
    <div className={`mt-5 ${Style.container}`}>
      <div className="">
        <div className={`${Style.rowContent} ${Style.headingRow}`}>
          <div className={Style.chooseContainer}>
            <label>Add/Remove Collateral</label>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={collateral}
                onChange={handleCollateralChange}
              >
                <FormControlLabel
                  value="Remove"
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
                  label={<span style={{color: collateral == "Remove" ? "#fff" : "#8D97A0"}}>Remove</span>}
                />
                <input
                  type="number"
                  className={collateral == "Remove" ? "" : Style.inputDisabled}
                  onChange={(e:any) => {setNewAmount(e.target.value)}}
                  onClick={(e:any) => {setNewAmount(e.target?.value);setCollateral("Remove")}}
                />

                <FormControlLabel
                  value="Add"
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
                  label={<span style={{color: collateral == "Add" ? "#fff" : "#8D97A0"}}>Add</span>}
                />
                <input
                  type="number"
                  className={collateral == "Add" ? "" : Style.inputDisabled}
                  onChange={(e:any) => {setNewAmount(e.target.value)}}
                  onClick={(e:any) => {setNewAmount(e.target?.value);setCollateral("Add")}}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Total Position Value</span>
            <span className="text-right">$1,000</span>
          </div>
          <div className={Style.rowContent}>
            <span>New Collateral Value</span>
            <span className="text-right">{`$${newAmount}`}</span>
          </div>
        </div>
        <div className={Style.seprator}></div>
        <div>
          <div className={Style.rowContent}>
            <span>New Leverage Factor</span>
            <span className="text-right">2.5x</span>
          </div>
        </div>
      </div>
      <button className={`mt-4 ${Style.button}`} onClick={handleClose} >
        Confirm
      </button>
    </div>
  )
}
export default EditPosition
