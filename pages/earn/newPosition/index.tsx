import Style from "./newPosition.module.scss";
import LeverageSlider from "components/UI/LeverageSlider/LeverageSlider";
import React, { useState } from "react";
import CustomButton from "components/UI/CustomButton";

import { toast } from "react-toastify";

import { useActiveWeb3React, useBankContract, useLendingPoolInfo, useLeveragePoolIRR, useTokenBalance, useTokenContract } from "hooks";
import Image from "next/image";
import { BigNumber, ethers, utils } from "ethers";
import { ABIS } from "abi";
import { BankInfo } from "interfaces";
import { formatBigNumber, getSafeBoxBycToken } from "utils";
import MaxButton from "components/UI/MaxButton";
import { SAFE_BOX } from "constant";

interface NewPositionProps {
  bank: BankInfo
  handleButtonClick: (value: string) => void;
}

const NewPosition = ({
  handleButtonClick,
  bank,
}: NewPositionProps) => {
  const { active, account, library, chainId } = useActiveWeb3React();
  const [isLoading, setLoading] = useState(false);
  const [colAmount, setCollateralAmount] = useState('0');
  const [leverage, setLeverage] = useState(bank?.DEF_LEVERAGE || 1);
  const colTokenContract = useTokenContract(bank?.COLLATERAL_TOKEN?.ADDR || ethers.constants.AddressZero);
  const bankContract = useBankContract();
  const uTokenBalance = useTokenBalance(bank?.COLLATERAL_TOKEN?.ADDR || ethers.constants.AddressZero);
  const lendingPool = useLendingPoolInfo(SAFE_BOX[chainId][getSafeBoxBycToken(chainId, bank?.cTOKEN.ADDR || "")]?.ADDR);
  const vaultIRR = useLeveragePoolIRR(bank?.LP || "");

  const parseLeverage = () => {
    return parseInt((leverage * 10000).toFixed(0));
  }

  const weeklyEarnings = (): BigNumber => {
    const col = utils.parseUnits(colAmount, bank?.COLLATERAL_TOKEN?.DECIMALS);
    const debtAmount = col.mul(parseLeverage()).div(10000);
    const weeklyVaultRewards = col.mul((vaultIRR * 100).toFixed(0)).div(10000).div(52);
    const weeklyDebt = debtAmount.mul(((lendingPool?.borrowApy || 0) * 100).toFixed(0)).div(10000).div(52);
    const weeklySupply = col.mul(((lendingPool?.supplyApy || 0) * 100).toFixed(0)).div(10000).div(52);
    return weeklyVaultRewards.add(weeklySupply).sub(weeklyDebt);
  }

  const netApy = () => {
    const col = utils.parseUnits(colAmount, bank?.COLLATERAL_TOKEN?.DECIMALS);
    if (col.isZero()) return 0;
    return weeklyEarnings().mul(52).mul(10000).div(col).toNumber() / 100;
  }

  const onMax = () => {
    setCollateralAmount(formatBigNumber(uTokenBalance, 18, 18).replaceAll(',', ''));
  }

  const onOpenPosition = async () => {
    if (!active || !library) {
      toast.error("Please connect wallet first!");
      return;
    }
    setLoading(true);
    const signer = await library.getSigner();
    const allowance: BigNumber = await colTokenContract.allowance(account, bankContract.address);
    const depositAmount = BigNumber.from(utils.parseUnits(colAmount, bank?.COLLATERAL_TOKEN?.DECIMALS))
    const borrowAmount = depositAmount.mul(parseLeverage()).div(10000);

    if (depositAmount.gt(allowance)) {
      const tx = await colTokenContract.connect(signer).approve(
        bankContract.address,
        depositAmount
      )
      await tx.wait();
    }

    const spell_interface = new ethers.utils.Interface(ABIS.BlbSpell);
    const tx = await bankContract.connect(signer).execute(
      0,
      bank.SPELL,
      spell_interface.encodeFunctionData("openPosition", [
        colTokenContract.address,
        depositAmount,
        borrowAmount
      ])
    )
    await tx.wait();

    setLoading(false);
    handleButtonClick?.("success-position");
  };

  return (
    <div className="mt-5">
      <div className={Style.topContainer}>
        <h5 className={`text-white ${Style.title}`}>BLB-USDC LP </h5>
        <div className={Style.rightContainer}>
          <div className={`${Style.rightSubContainer} mx-5`}>
            <span className={`${Style.text1}`}>Pool Ratio</span>
            <span className={`text-white  ${Style.text2}`}>
              70% BLB / 30% USDC
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
          <p className={Style.label}>Input Collateral Amount</p>
          <div className={Style.formControl}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={bank?.COLLATERAL_TOKEN.LOGO}
                width={40}
                height={40}
                alt="image"
              />
              <p
                className={Style.symbol}
                style={{
                  marginLeft: 10,
                  color: "#fff",
                  width: "42px",
                }}
              >{bank?.COLLATERAL_TOKEN.SYMBOL}</p>
              <p
                className={Style.balance}
                style={{
                  marginLeft: 'auto',
                  color: "#fff",
                }}
              >Balance: {formatBigNumber(uTokenBalance, bank?.COLLATERAL_TOKEN.DECIMALS, 4)}</p>
            </div>
            <div className="amount-input">
              <input
                type="number"
                placeholder="0"
                onChange={(e) => setCollateralAmount(e.target.value || '0')}
                value={colAmount}
                min="0"
              />
              <MaxButton onClick={onMax} />
            </div>
          </div>
        </div>
        <div className={` ${Style.chooseSubContainer}`}></div>

        <div className={Style["chooseContainer-content"]}>
          <p className={`${Style.label} ${Style.chooseSubContainerLabel}`}>
            Choose Leverage
          </p>
          <LeverageSlider
            marks={[
              {
                value: 0,
                label: "0x",
              },
              {
                value: 1,
                label: "1x",
              },
              {
                value: 3,
                label: "3x",
              },
            ]}
            max={3}
            realMax={3}
            value={leverage}
            setValue={setLeverage}
          />
        </div>
      </div>

      <div className={Style.bottomContainer}>
        <ul className={Style.list}>
          <li>
            <span>Total Position Value</span>{" "}
            <p className={Style.bold}>
              ${formatBigNumber(
                utils.parseUnits(colAmount, bank?.COLLATERAL_TOKEN.DECIMALS),
                bank?.COLLATERAL_TOKEN.DECIMALS)
              }
            </p>
          </li>
          <li>
            <span>Borrowing</span>{" "}
            <span className={Style.bold}>
              ${formatBigNumber(
                utils.parseUnits(colAmount, bank?.COLLATERAL_TOKEN.DECIMALS).mul(parseLeverage()).div(10000),
                bank?.COLLATERAL_TOKEN.DECIMALS)
              }
            </span>
          </li>
          <li>
            <span>Borrow Rate</span>
            <span className={Style.bold}>
              {lendingPool?.borrowApy.toFixed(2)}%
            </span>
          </li>
          <li>
            <span>Net APY</span>
            <span className={Style.bold}>{netApy().toFixed(2)}%</span>
          </li>
        </ul>

        <div className={Style.bottomContainerRight}>
          <h6>Expected Weekly Earnings</h6>
          <h3>${formatBigNumber(weeklyEarnings())}</h3>
        </div>
      </div>
      <CustomButton
        title={"Open Positon"}
        buttonStyle={`mt-4 ${Style.button}`}
        handleButtonClick={onOpenPosition}
        isLoading={isLoading}
      />
    </div>
  );
};
export default NewPosition;
