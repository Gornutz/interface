import { Contract, ethers } from "ethers";
import { useMemo } from "react";
import { ADDRESS } from "constant";
import { ABIS } from "abi";
import { useActiveWeb3React } from "./useEthers";

export const useTokenContract = (addr: string = ethers.constants.AddressZero): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(addr, ABIS.ERC20, library), [library, addr]);
}

export const useBankContract = (): Contract => {
	const { chainId, library } = useActiveWeb3React();
	return useMemo(() => new Contract(ADDRESS[chainId].BANK, ABIS.Bank, library), [library, chainId]);
}

export const useSafeBox = (address: string = ethers.constants.AddressZero): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(address, ABIS.SafeBox, library), [library, address]);
}

export const useBaseToken = (address: string): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(address, ABIS.BaseToken, library), [library, address]);
}