import { BigNumber } from "ethers";
import { BankInfo } from "interfaces";
import { ADDRESS } from "./address";
import { bTokens } from "./bTokens";
import { ChainId } from "./chain";
import { TOKEN_LOGO } from "./tokenLogo";
import { TOKENS } from "./tokens";

export const BANK_CONFIG = {
	[ChainId.Mainnet]: {
		SUPPORTED_TOKENS: []
	},
	[ChainId.Goerli]: {
		SUPPORTED_TOKENS: [
			TOKENS[ChainId.Goerli].USDC,
			TOKENS[ChainId.Goerli].BLB,
		]
	}
}

export const BANKS: {
	[chainId: number]: {
		[poolName: string]: BankInfo
	}
} = {
	[ChainId.Mainnet]: {
	},
	[ChainId.Goerli]: {
		BLB_USDC: {
			NAME: 'BLB-USDC Vault',
			LOGO: TOKEN_LOGO.BLB,
			SPELL: ADDRESS[ChainId.Goerli].BLB_VAULT_SPELL,
			WRAPPER: ADDRESS[ChainId.Goerli].WERC20,
			WRAPPER_TOKENID: BigNumber.from('344351319699915614502640758401705380744693736821'),
			LP: ADDRESS[ChainId.Goerli].BLB_USDC_BLB_VAULT,
			POOL_ID: 20006,
			COLLATERAL_TOKEN: TOKENS[ChainId.Goerli].USDC,
			cTOKEN: bTokens[ChainId.Goerli].bSupplyToken,
			DEF_LEVERAGE: 1.2
		}
	}
}