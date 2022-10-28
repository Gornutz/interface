import { bTokenInfo } from "interfaces";
import { ChainId } from "./chain";
import { TOKENS } from "./tokens";

export const bTokens: Record<number, Record<string, bTokenInfo>> = {
  [ChainId.Mainnet]: {
  },
  [ChainId.Goerli]: {
    // bUSDC: {
    //   ADDR: '0x9E21B0f64fB7A17887933371596deaa666f78126',
    //   DECIMALS: 6,
    //   SYMBOL: 'bUSDC',
    //   UNDERLYING: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
    // },
    // bDAI: {
    //   ADDR: '0xE887f395fc63B865F08E2673cC256C96fe80A9d6',
    //   DECIMALS: 18,
    //   SYMBOL: 'bDAI',
    //   UNDERLYING: '0x73967c6a0904aA032C103b4104747E88c566B1A2'
    // },
    // bUSDT: {
    //   ADDR: '0xFC884B3d3A029106808197254860f35b22197878',
    //   DECIMALS: 6,
    //   SYMBOL: 'bUSDT',
    //   UNDERLYING: '0xe802376580c10fE23F027e1E19Ed9D54d4C9311e'
    // },
    // bWETH: {
    //   ADDR: '0x56ff14a079b54A7B9f2B675629dec5d0693057EA',
    //   DECIMALS: 18,
    //   SYMBOL: 'bWETH',
    //   UNDERLYING: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
    // },
    // bBTC: {
    //   ADDR: '0x674851f8Cc7847a1fe40CBD7946d0846d33C1FD5',
    //   DECIMALS: 8,
    //   SYMBOL: 'bBTC',
    //   UNDERLYING: '0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05'
    // },
    bBaseToken: {
      ADDR: '0x8780dce63d44924644de0884e8e50809d3799540',
      DECIMALS: 18,
      SYMBOL: 'bBaseToken',
      uTOKEN: TOKENS[ChainId.Goerli].BLB
    },
    bSupplyToken: {
      ADDR: '0x6a4272594a031a64412434a275f2118b72a52623',
      DECIMALS: 18,
      SYMBOL: 'bSupplyToken',
      uTOKEN: TOKENS[ChainId.Goerli].USDC
    },
    // bICHI: {
    //   ADDR: '0x7f8234346d6D36c3577570E38df036B90E018464',
    //   DECIMALS: 18,
    //   SYMBOL: 'bICHI',
    //   UNDERLYING: '0x9667Ead021746730F064b2F4f650d50A957e41F8'
    // },
  }
}