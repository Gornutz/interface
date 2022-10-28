import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { ILevPosition } from "interfaces";
import { useActiveWeb3React, useTokenPrices } from "hooks";
import { getTokenDecimalByAddr } from "utils";
import { AppState } from "state";

// 2. Leverage Pool Hooks
export const useLeveragePositions = (): ILevPosition[] => {
	return useSelector((state: AppState) => state.contracts.leveragePositions || []);
}

/**
 * Returns sum of current position USD value for all my farming positions.
 * Use it for dashboard metrics
 */
export const useLeverageTotalValue = (): BigNumber => {
	const positions = useLeveragePositions();
	let totalValue = ethers.constants.Zero;
	positions.forEach(position => {
		totalValue = totalValue.add(position.cv);
	})
	return totalValue;
}

/**
 * @abc Returns sum of debs for all my farming positions
 */
export const useLeverageTotalDebt = (): BigNumber => {
	const positions = useLeveragePositions();
	let totalValue = ethers.constants.Zero;
	positions.forEach(position => {
		totalValue = totalValue.add(position.debtValue);
	})
	return totalValue;
}

export const useLeverageTotalUValue = (): BigNumber => {
	const { chainId } = useActiveWeb3React();
	const positions = useLeveragePositions();
	const tokenPrices = useTokenPrices();
	let totalValue = ethers.constants.Zero;

	positions.forEach(position => {
		const price = tokenPrices[position.underlyingToken.toLowerCase()] || ethers.constants.Zero;
		const decimal = getTokenDecimalByAddr(chainId, position.underlyingToken);
		totalValue = price.mul(position.underlyingAmount)
			.div(BigNumber.from(10).pow(decimal));
	})

	return totalValue;
}

export const useLeveragePoolIRRs = (): Record<string, number> => {
	return useSelector((state: AppState) => state.contracts.leveragePoolIRR || {});
}

export const useLeveragePoolIRR = (key: string): number => {
	return useSelector((state: AppState) => state.contracts.leveragePoolIRR[key.toLowerCase()] || 0);
}

export const useLeveragePoolTVLs = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.leveragePoolTVL || {});
}

export const useLeveragePoolTVL = (pool: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.leveragePoolTVL[pool] || ethers.constants.Zero);
}

export const useTotalLeverageTVL = (): BigNumber => {
	const tvls = useLeveragePoolTVLs();
	let totalTvl = ethers.constants.Zero;
	Object.keys(tvls).forEach(key => {
		totalTvl = totalTvl.add(tvls[key]);
	})
	return totalTvl;
}

export const useTotalLevWeeklyEarnings = (): BigNumber => {
	const positions = useLeveragePositions();
	let earnings = ethers.constants.Zero;
	positions.forEach(pos => {
		earnings = earnings.add(pos.weeklyEarningsUSD);
	})
	return earnings;
}

export const useTop3LevPositions = (): ILevPosition[] => {
	const positions = useLeveragePositions();
	const arrayForSort = [...positions];
	let res = [];
	res = arrayForSort.sort((a, b) => {
		if (a.cv.gt(b.cv)) return -1;
		if (a.cv.eq(b.cv)) return 0;
		else return 1;
	}).slice(0, 3);
	return res;
}