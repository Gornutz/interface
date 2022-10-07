import Style from "./yourPosition.module.scss";
import { IPosition } from "../../../interfaces";
import { toast } from "react-toastify";
import { BigNumber, ethers, utils } from "ethers";
import { useActiveWeb3React } from "../../../hooks";

const YourPosition = ({
  handleClosepositionPopup,
  position = {
    owner: "",
    collToken: "",
    underlyingToken: "",
    underlyingAmount: ethers.constants.Zero,
    underlyingcTokenAmount: ethers.constants.Zero,
    collId: "",
    collateralSize: ethers.constants.Zero,
    debtMap: "",
    positionId: 0,
    debtValue: ethers.constants.Zero,
    risk: 0
  },
}: {
  handleClosepositionPopup: any;
  position: IPosition;
}) => {
  const { active } = useActiveWeb3React();
  const handleClick = (value: string) => {
    if (!active) {
      toast.error("Please connect wallet first!");
      return;
    }

    handleClosepositionPopup(value);
  };

  let borrowingAmount = utils.formatEther(position.collateralSize);
  let borrowingRate = BigNumber.from(position.collateralSize).mul(100).div(position.collateralSize).toNumber();
  let leverageFactor = BigNumber.from(position.collateralSize).mul(100).div(position.underlyingAmount).toNumber()/100;

  return (
    <div className={`mt-5 ${Style.container}`}>
      <div className="p-3">
        <div className={`${Style.rowContent} ${Style.headingRow}`}>
          <span>Your Collateral ($ Value)</span>
          <span className="text-right">
            ${utils.formatEther(position.underlyingAmount)} USDC
          </span>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Total Position Value</span>
            <span className="text-right">${utils.formatEther(position.collateralSize)} USDC</span>
          </div>
          <div className={Style.rowContent}>
            <span>Borrowing</span>
            <span className="text-right">
              {borrowingAmount} USDC (${borrowingAmount})
            </span>
          </div>
          <div className={Style.rowContent}>
            <span>Borrow Rate</span>
            <span className="text-right">{borrowingRate}%</span>
          </div>
          <div className={Style.rowContent}>
            <span>Net APY</span>
            <span className="text-right">110%</span>
          </div>
        </div>
        <div className={Style.seprator}></div>
        <div>
          <div className={Style.rowContent}>
            <span>Leverage Factor</span>
            <span className="text-right">{leverageFactor}x</span>
          </div>
          <div className={Style.rowContent}>
            <span>ROI From Entry</span>
            <span className="text-right">$100</span>
          </div>
          <div className={Style.rowContent}>
            <span>ICHI Liquidation Price</span>
            <span className="text-right">$1.50</span>
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
