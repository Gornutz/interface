import { BigNumber } from "ethers";
import { TokenInfo, bTokenInfo } from "interfaces";

export interface BankInfo {
	NAME: string;
	LOGO: string;
	SPELL: string;
	WRAPPER: string;
	WRAPPER_TOKENID: BigNumber;
	LP: string;
	COLLATERAL_TOKEN: TokenInfo;
	cTOKEN: bTokenInfo;
	DEF_LEVERAGE: number;
	POOL_ID: number;										// Pool ID of BLB Angel Vault
}
