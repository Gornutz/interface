import Style from "./editPosition.module.scss";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import CustomButton from "components/UI/CustomButton";
import { ILevPosition } from "interfaces";
import { BigNumber, ethers, utils } from "ethers";
import { formatBigNumber } from "utils";
import { useActiveWeb3React, useBankContract, useTokenContract } from "hooks";
import { toast } from "react-toastify";
import { BANKS, TOKENS } from "constant";
import { ABIS } from "abi";

interface Props {
  handleClose: () => void;
  position: ILevPosition
}

const EditPosition = ({
  handleClose,
  position
}: Props) => {
  const [collateral, setCollateral] = useState('Add');
  const [newAmount, setNewAmount] = useState("0");
  const [isLoading, setLoading] = useState(false);

  const { active, chainId, account, library } = useActiveWeb3React();
  const bankContract = useBankContract();
  const uTokenContract = useTokenContract(position?.underlyingToken || ethers.constants.AddressZero);

  const getuTokenInfo = () => {
    const keys = Object.keys(TOKENS[chainId]).filter(key => TOKENS[chainId][key].ADDR.toLowerCase() === position.underlyingToken.toLowerCase());
    if (keys.length == 0) {
      return undefined;
    }
    return TOKENS[chainId][keys[0]];
  }

  const getBankInfo = () => {
    const keys = Object.keys(BANKS[chainId]).filter(key => BANKS[chainId][key].WRAPPER.toLowerCase() === position.collToken.toLowerCase());
    if (keys.length == 0) {
      return undefined;
    }
    return BANKS[chainId][keys[0]];
  }

  const handleCollateralChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCollateral((event.target as HTMLInputElement).value);
  };

  let leverageFactor = !position || BigNumber.from(position.underlyingAmount).isZero() ? 0 :
    BigNumber.from(position.collateralSize).mul(100).div(position.underlyingAmount).toNumber() / 100;

  const handleConfirm = async () => {
    if (!active) {
      toast.error("Please connect wallet first!");
      return;
    }
    try {
      setLoading(true);
      const signer = await library.getSigner();
      let spell_iface = new ethers.utils.Interface(ABIS.BlbSpell);
      const uTokenInfo = getuTokenInfo();
      const bankInfo = getBankInfo();
      const amount = BigNumber.from(utils.parseUnits(newAmount.toString(), uTokenInfo.DECIMALS));

      if (collateral == "Add") {
        const allowance: BigNumber = await uTokenContract.allowance(account, bankContract.address);

        if (amount.gt(allowance)) {
          const tx = await uTokenContract.connect(signer).approve(
            bankContract.address,
            amount
          )
          await tx.wait();
        }

        let tx = await bankContract.connect(signer).execute(
          position.positionId,
          bankInfo.SPELL,
          spell_iface.encodeFunctionData("increasePosition", [
            bankInfo.COLLATERAL_TOKEN,
            amount
          ])
        );
        await tx.wait();
      } else {
        let tx = await bankContract.connect(signer).execute(
          position.positionId,
          bankInfo.SPELL,
          spell_iface.encodeFunctionData("reducePosition", [
            bankInfo.COLLATERAL_TOKEN,
            amount
          ])
        );
        await tx.wait();
      }

      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
  };

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
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: "#05A06B",
                          "svg:first-of-type": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        color: collateral == "Remove" ? "#fff" : "#8D97A0",
                      }}
                    >
                      Remove
                    </span>
                  }
                />
                <input
                  type="number"
                  className={collateral == "Remove" ? "" : Style.inputDisabled}
                  onChange={(e: any) => {
                    setNewAmount(e.target.value);
                  }}
                  onClick={(e: any) => {
                    setNewAmount(e.target?.value);
                    setCollateral("Remove");
                  }}
                />

                <FormControlLabel
                  value="Add"
                  color="secondary"
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                        marginLeft: "10px",
                        "&.Mui-checked": {
                          color: "#05A06B",
                          "svg:first-of-type": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        color: collateral == "Add" ? "#fff" : "#8D97A0",
                      }}
                    >
                      Add
                    </span>
                  }
                />
                <input
                  type="number"
                  className={collateral == "Add" ? "" : Style.inputDisabled}
                  onChange={(e: any) => {
                    setNewAmount(e.target.value);
                  }}
                  onClick={(e: any) => {
                    setNewAmount(e.target?.value);
                    setCollateral("Add");
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Total Position Value</span>
            <span className="text-right">${formatBigNumber(position?.collateralSize)}</span>
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
            <span className="text-right">{leverageFactor}x</span>
          </div>
        </div>
      </div>
      <CustomButton
        title={"Confirm"}
        buttonStyle={`mt-4 ${Style.button}`}
        handleButtonClick={handleConfirm}
        isLoading={isLoading}
      />
    </div>
  );
};
export default EditPosition;
