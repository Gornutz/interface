import Style from "./yourPosition.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useActiveWeb3React, useLendingPoolInfo, useSafeBox } from "hooks";
import CustomButton from "components/UI/CustomButton";
import { SAFE_BOX } from "constant";
import { ethers } from "ethers";
import { formatBigNumber } from "utils";
import Image from "next/image";

const YourPosition = ({
  handleClosepositionPopup,
  poolKey
}: {
  handleClosepositionPopup: () => void;
  poolKey: string;
}) => {
  const [isLoading, setLoading] = useState(false);

  const { active, library, chainId } = useActiveWeb3React();
  const poolInfo = useLendingPoolInfo(SAFE_BOX[chainId][poolKey]?.ADDR);
  const safeBox = useSafeBox(SAFE_BOX[chainId][poolKey]?.ADDR || ethers.constants.AddressZero);

  const onClose = async () => {
    try {
      if (!active) {
        toast.error("Please connect wallet first!");
        return;
      }
      setLoading(true);

      const signer = await library.getSigner();
      const tx = await safeBox.connect(signer).withdraw(poolInfo.myPoolBalance);
      await tx.wait();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    handleClosepositionPopup();
  };

  return (
    <div className={`mt-5 ${Style.container}`}>
      <div className="p-3">
        <div className={`${Style.rowContent} ${Style.headingRow}`}>
          <span>Your Collateral ($ Value)</span>
          <span className="text-right">
            ${formatBigNumber(poolInfo?.myPoolBalanceUSD)}
          </span>
        </div>
        <div className={Style.seprator}> </div>
        <div>
          <div className={Style.rowContent}>
            <span>Net APY</span>
            <span className="text-right">{poolInfo?.supplyApy.toFixed(2)}%</span>
          </div>
          <div className={Style.rowContent}>
            <span>Weekly Earnings</span>
            <span className="text-right">${formatBigNumber(poolInfo?.myWeeklyEarningsUSD)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <CustomButton
          title={"Close Positon"}
          buttonStyle={`mt-4 ${Style.button}`}
          isLoading={isLoading}
          handleButtonClick={onClose}
        />
      </div>
    </div>
  );
};
export default YourPosition;
