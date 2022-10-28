import Style from "./yourPosition.module.scss";
import { ILevPosition } from "interfaces";
import { toast } from "react-toastify";
import { BigNumber, ethers } from "ethers";
import { useActiveWeb3React, useLendingPoolInfo } from "hooks";
import { formatBigNumber } from "utils";
import { BANKS, SAFE_BOX } from "constant";
import ProgressBar from "components/UI/ProgressBar/ProgressBar";

const YourPosition = ({
  handleClosepositionPopup,
  position = {
    owner: "",
    collToken: "",
    underlyingToken: "",
    underlyingAmount: ethers.constants.Zero,
    underlyingcTokenAmount: ethers.constants.Zero,
    collId: ethers.constants.Zero,
    collateralSize: ethers.constants.Zero,
    debtMap: "",
    positionId: 0,
    debtValue: ethers.constants.Zero,
    health: 0,
    cv: ethers.constants.Zero,
    bankKey: "",
    safeBoxKey: "",
    apy: 0,
    weeklyEarningsUSD: ethers.constants.Zero,
    equitySum: ethers.constants.Zero,
  },
}: {
  handleClosepositionPopup: any;
  position: ILevPosition;
}) => {
  const { active, chainId } = useActiveWeb3React();
  const handleClick = (value: string) => {
    if (!active) {
      toast.error("Please connect wallet first!");
      return;
    }

    handleClosepositionPopup(value);
  };
  const lendingPool = useLendingPoolInfo(SAFE_BOX[chainId][position.safeBoxKey]?.ADDR);

  let leverageFactor = BigNumber.from(position.underlyingAmount).isZero() ? 0 :
    BigNumber.from(position.collateralSize).mul(100).div(position.underlyingAmount).toNumber() / 100;
  const pnl = (): BigNumber => {
    if (position.debtValue.gte(position.cv)) {
      return position.debtValue.sub(position.cv);
    } else {
      return position.cv.sub(position.debtValue);
    }
  }

  return (
    <div className={`mt-5 ${Style.container}`}>
      <div className="p-3">
        <div className={`${Style.rowContent} ${Style.headingRow}`}>
          <span>Your Collateral ($ Value)</span>
          <span className="text-right">
            ${formatBigNumber(position.underlyingAmount)}
          </span>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Total Position Value</span>
            <span className="text-right">${formatBigNumber(position.collateralSize)}</span>
          </div>
          <div className={Style.rowContent}>
            <span>Debt</span>
            <span className="text-right">
              ${formatBigNumber(position.debtValue)}
            </span>
          </div>
          <div className={Style.rowContent}>
            <span>Borrow Rate</span>
            <span className="text-right">{lendingPool?.borrowApy.toFixed(2)}%</span>
          </div>
          <div className={Style.rowContent}>
            <span>Net APY</span>
            <span className="text-right">{position.apy.toFixed(2)}%</span>
          </div>
        </div>
        <div className={Style.seprator}></div>
        <div>
          <div className={Style.rowContent}>
            <span>Leverage Factor</span>
            <span className="text-right">{leverageFactor}x</span>
          </div>
          <div className={Style.rowContent}>
            <span>PnL</span>
            <span className="text-right">
              {position.debtValue.gte(position.cv) && '-'} ${formatBigNumber(pnl())}
            </span>
          </div>
          <div className={Style.rowContent}>
            <span>Position Health</span>
            <span className="text-right" style={{ width: '70%' }}>
              {position.health}%
            </span>
          </div>
          <div className={Style.rowContent}>
            <ProgressBar
              color={`linear-gradient(89.83deg, #0056e0 0.3%, #57c5e0 99.81%)`}
              value={position.health}
            ></ProgressBar>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <button
          className={`mt-4 ${Style.button}`}
          onClick={() => handleClick("close-position")}
        >
          Close Positon
        </button>
        <button
          className={`mt-4 ${Style.button}`}
          onClick={() => handleClick("edit-position")}
        >
          Edit Collateral
        </button>
      </div>
    </div>
  );
};
export default YourPosition;
