import { DEFAULT_CHAIN, NETWORKS, RPC_KEY } from 'constant';
import { ethers } from 'ethers'
import { Provider } from 'ethers-multicall';

export const simpleRpcProvider = new ethers.providers.AlchemyProvider(NETWORKS[DEFAULT_CHAIN].NAME, RPC_KEY);

export const MulticallProvider = new Provider(simpleRpcProvider, DEFAULT_CHAIN);