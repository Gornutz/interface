import { SafeBoxInfo } from "interfaces";
import { ADDRESS } from "./address";
import { bTokens } from "./bTokens";
import { ChainId } from "./chain"
import { TOKEN_LOGO } from "./tokenLogo";

export const SAFE_BOX: {
	[chainId: number]: {
		[token: string]: SafeBoxInfo
	}
} = {
	[ChainId.Mainnet]: {
	},
	[ChainId.Goerli]: {
		USDC: {
			ADDR: ADDRESS[ChainId.Goerli].SAFEBOX_USDC,
			LOGO: TOKEN_LOGO.USDC,
			SYMBOL: 'ibUSDC',
			DECIMAL: 18,
			cTOKEN: bTokens[ChainId.Goerli].bSupplyToken
		},
		BLB: {
			ADDR: ADDRESS[ChainId.Goerli].SAFEBOX_BLB,
			LOGO: TOKEN_LOGO.BLB,
			SYMBOL: 'ibBLB',
			DECIMAL: 18,
			cTOKEN: bTokens[ChainId.Goerli].bBaseToken
		}
	}
}