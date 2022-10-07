export enum ChainId {
	Mainnet = 1,
	Goerli = 5,
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet, ChainId.Goerli];

export const RPC_KEY = 'p7zwMl-PuYfW0agQvcDzMo7bvnXX-Hqj'

export const NETWORK_CONNECTIONS = {
	[ChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${RPC_KEY}`,
	[ChainId.Goerli]: `https://eth-goerli.alchemyapi.io/v2/${RPC_KEY}`,
}

export const NETWORK_NAMES = {
	[ChainId.Mainnet]: 'mainnet',
	[ChainId.Goerli]: 'goerli'
}

export const DEFAULT_CHAIN = ChainId.Goerli;