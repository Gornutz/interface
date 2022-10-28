import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useTotalLendingPoolTvl, useTotalLeverageTVL } from 'hooks';

export const useEthBalance = (): BigNumber => {
	return useSelector((state: AppState) => state.contracts.ethBalance || ethers.constants.Zero);
}

export const useTotalTvl = (): BigNumber => {
	const leverageTvl = useTotalLeverageTVL();
	const lendingTvl = useTotalLendingPoolTvl();
	return lendingTvl.add(leverageTvl);
}

export const useTokenPrices = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.tokenPrices || {});
}

export const useTokenPrice = (addr: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.tokenPrices[addr.toLowerCase()] || ethers.constants.One);
}

export const useTokenBalance = (addr: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.balances[addr.toLowerCase()] || ethers.constants.Zero);
}

export const useTokenBalances = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.balances || {});
}
