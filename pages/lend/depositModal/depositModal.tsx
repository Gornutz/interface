import Style from "./depositModal.module.scss";
import { useState } from "react";
import CustomButton from "components/UI/CustomButton";

import { toast } from "react-toastify";
import { useActiveWeb3React, useLendingPoolInfo, useSafeBox, useTokenContract } from "hooks";
import { SAFE_BOX } from "constant";
import { utils } from "ethers";
import Image from "next/image";

interface DepositModalProps {
  poolName: string;
  handleButtonClick: () => void;
}

const DepositModal = ({ poolName, handleButtonClick }: DepositModalProps) => {
  const [amount, setAmount] = useState("0");
  const [isLoading, setLoading] = useState(false);

  const { active, library, chainId, account } = useActiveWeb3React();
  const lendingPoolInfo = useLendingPoolInfo(SAFE_BOX[chainId][poolName]?.ADDR)
  const safeBox = useSafeBox(SAFE_BOX[chainId][poolName]?.ADDR);
  const uToken = useTokenContract(SAFE_BOX[chainId][poolName]?.cTOKEN.uTOKEN.ADDR);

  const onLend = async () => {
    try {
      if (!library || !active) {
        toast.error("Please connect wallet first!");
        return;
      }
      setLoading(true);

      const signer = await library.getSigner();
      const allowance = await uToken.connect(signer).allowance(account, safeBox.address);
      const depositAmount = utils.parseUnits(amount, SAFE_BOX[chainId][poolName].cTOKEN.uTOKEN.DECIMALS);

      if(depositAmount.gt(allowance)) {
        const tx = await uToken.connect(signer).approve(
          safeBox.address,
          depositAmount
        )
        await tx.wait();
      }
      const tx = await safeBox.connect(signer).deposit(depositAmount);
      await tx.wait();

      handleButtonClick?.();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className={`mt-5 ${Style.chooseContainer}`}>
        <div className={Style["chooseContainer-content"]}>
          <label>Input Amount</label>
          <Image
            src={SAFE_BOX[chainId][poolName]?.LOGO}
            width={40}
            height={40}
            alt={poolName}
          />
          <span className={Style.tokenLabel}>{poolName}</span>
          <input type="text" onChange={(e) => setAmount(e.target.value)} />
        </div>
      </div>
      <div className={Style.bottomContainer}>
        <ul className={Style.list}>
          <li>
            <span>Net APY</span>
            <span className={Style.bold}>
              {lendingPoolInfo?.supplyApy.toFixed(2)} %
            </span>
          </li>
        </ul>

        <div className={Style.bottomContainerRight}>
          <h6>Expected Weekly Earnings</h6>
          <h3>$</h3>
        </div>
      </div>
      <CustomButton
        title={"Deposit"}
        buttonStyle={`mt-4 ${Style.button}`}
        handleButtonClick={onLend}
        isLoading={isLoading}
      />
    </div>
  );
};
export default DepositModal;
