import { BANKS, SAFE_BOX, TOKENS } from "constant"
import { BigNumber } from "ethers";
import { SafeBoxInfo } from "interfaces";

export const getTokenDecimalByAddr = (chainId: number, tokenAddr: string): number => {
	const tokenKeys = Object.keys(TOKENS[chainId])
		.filter(key => TOKENS[chainId][key].ADDR.toLowerCase() === tokenAddr.toLowerCase());

	if (tokenKeys.length > 0)
		return TOKENS[chainId][tokenKeys[0]].DECIMALS;
	else
		return 0;
}

export const getBankByColId = (chainId: number, coll: string, collId: BigNumber): string => {
	const bankKeys = Object.keys(BANKS[chainId]).filter(key =>
		BANKS[chainId][key].WRAPPER.toLowerCase() === coll.toLowerCase() &&
		BANKS[chainId][key].WRAPPER_TOKENID.eq(collId)
	);
	if (bankKeys.length > 0)
		return bankKeys[0];
	else undefined;
}

export const getSafeBoxBycToken = (chainId: number, cTokenAddr: string): string => {
	const keys = Object.keys(SAFE_BOX[chainId]).filter(key =>
		SAFE_BOX[chainId][key].cTOKEN.ADDR.toLowerCase() === cTokenAddr.toLowerCase()
	);
	if (keys.length > 0)
		return keys[0];
	else undefined;
}