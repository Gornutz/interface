import { TokenInfo } from "interfaces";
import { ChainId } from "./chain";
import { TOKEN_LOGO } from "./tokenLogo";

export const TOKENS: Record<number, Record<string, TokenInfo>> = {
  [ChainId.Mainnet]: {
	},
  [ChainId.Goerli] : {
    BLB: {
      LOGO: TOKEN_LOGO.BLB,
      ADDR: '0xb55242C8517CebfB150A615F68C38bd04854A5dE',
      DECIMALS: 18,
      SYMBOL: 'BLB'
    },
    USDC: {
      LOGO: TOKEN_LOGO.USDC,
      ADDR: '0xEdA174a7DcC44CC391C21cCFd16715eE660Bd35f',
      DECIMALS: 18,
      SYMBOL: 'USDC'
    },
  }
};