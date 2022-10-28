import { BigNumber } from "ethers";
import { ChainInfo } from "interfaces";

export const RPC_KEY = 'p7zwMl-PuYfW0agQvcDzMo7bvnXX-Hqj'

export enum ChainId {
	Mainnet = 1,
	Goerli = 5,
}

export const NETWORKS: {
	[chainId: number]: ChainInfo
} = {
	[ChainId.Mainnet]: {
		NAME: 'mainnet',
		LOGO: '/icons/eth.svg',
		RPC: `https://eth-mainnet.alchemyapi.io/v2/${RPC_KEY}`,
		ChainID: ChainId.Mainnet,
		LABEL: 'Ethereum',
		MAINNET: true,
	},
	[ChainId.Goerli]: {
		NAME: 'goerli',
		LOGO: '/icons/eth-white.svg',
		RPC: `https://eth-goerli.alchemyapi.io/v2/${RPC_KEY}`,
		ChainID: ChainId.Goerli,
		LABEL: 'Goerli Testnet',
		MAINNET: false,
	},
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet, ChainId.Goerli];

export const DEFAULT_CHAIN = ChainId.Goerli;

export const PRECISION_18 = BigNumber.from(10).pow(18);