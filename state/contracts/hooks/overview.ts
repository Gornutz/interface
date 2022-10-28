import { BigNumber } from "ethers";
import { useLendingPoolTotalDeposit, useTotalLendingWeeklyEarnings } from "./lending";
import { useLeverageTotalDebt, useLeverageTotalUValue, useLeverageTotalValue, useTotalLevWeeklyEarnings } from "./leverage";

export const useMyWeeklyEarnings = (): BigNumber => {
	const levEarnings = useTotalLevWeeklyEarnings();
	const lendingEarnings = useTotalLendingWeeklyEarnings();
	return levEarnings.add(lendingEarnings);
}

export const useNetWorth = (): BigNumber => {
	const lendingDeposit = useLendingPoolTotalDeposit();
	const farmingPosValue = useLeverageTotalValue();
	const totalDebt = useLeverageTotalDebt();
	const totaluValue = useLeverageTotalUValue();
	return lendingDeposit
		.add(farmingPosValue)
		.add(totaluValue)
		.sub(totalDebt);
}

export const useNetAPY = (): number => {
	const weeklyEarnings = useMyWeeklyEarnings();
	const netWorth = useNetWorth();
	const apy = netWorth.isZero() ? 0 :
		weeklyEarnings.mul(52).mul(10000).div(netWorth).toNumber() / 100;
	return apy;
}