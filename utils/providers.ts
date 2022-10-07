import { ChainId, DEFAULT_CHAIN, NETWORK_CONNECTIONS, NETWORK_NAMES, RPC_KEY } from '../constant';
import { ethers } from 'ethers'
import { Provider } from 'ethers-multicall';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONNECTIONS[DEFAULT_CHAIN])

const provider = new ethers.providers.AlchemyProvider(NETWORK_NAMES[DEFAULT_CHAIN], RPC_KEY);
export const MulticallProvider = new Provider(provider, DEFAULT_CHAIN);