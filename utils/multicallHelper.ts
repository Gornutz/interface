import { Contract } from 'ethers-multicall';
import { ABIS } from '../contracts/abi';

export const getMultiERC20Contract = (address: string): Contract => {
	return new Contract(address, ABIS.ERC20);
}

export const getMultiBank = (address: string): Contract => {
	return new Contract(address, ABIS.Bank);
}