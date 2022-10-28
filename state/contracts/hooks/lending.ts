import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { SAFE_BOX } from "constant";
import { useActiveWeb3React } from "hooks";
import { AppState } from "state";
import { ILendingPool } from "interfaces";

export const useLendingPoolTotalDeposit = (): BigNumber => {
	const poolInfo = useLendingPoolInfos();
	const { chainId } = useActiveWeb3React();

	let deposit = ethers.constants.Zero;
	Object.keys(SAFE_BOX[chainId]).forEach(key => {
		deposit = deposit.add(poolInfo[SAFE_BOX[chainId][key].ADDR.toLowerCase()]?.myPoolBalanceUSD ?? ethers.constants.Zero)
	})
	return deposit;
}

export const useLendingPoolInfo = (poolAddr: string = ethers.constants.AddressZero): ILendingPool => {
	return useSelector((state: AppState) => state.contracts.lendingPoolInfo[poolAddr.toLowerCase()]);
}

export const useLendingPoolInfos = (): {
	[key: string]: ILendingPool
} => {
	return useSelector((state: AppState) => state.contracts.lendingPoolInfo || {});
}

export const useTotalLendingPoolTvl = (): BigNumber => {
	const poolInfos = useLendingPoolInfos();
	let totalTvl = ethers.constants.Zero;
	Object.keys(poolInfos).forEach(key => {
		totalTvl = totalTvl.add(poolInfos[key].tvl);
	})
	return totalTvl;
}

export const useTotalLendingWeeklyEarnings = (): BigNumber => {
	const poolInfos = useLendingPoolInfos();
	let earnings = ethers.constants.Zero;
	Object.keys(poolInfos).forEach(key => {
		earnings = earnings.add(poolInfos[key].myWeeklyEarningsUSD);
	})
	return earnings;
}