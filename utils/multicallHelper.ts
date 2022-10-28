import { Contract } from 'ethers-multicall';
import { ABIS } from 'abi';

export const getMultiERC20Contract = (address: string): Contract => {
  return new Contract(address, ABIS.ERC20);
}

export const getMultiBank = (address: string): Contract => {
  return new Contract(address, ABIS.Bank);
}

export const getMultiCoreOracle = (address: string): Contract => {
  return new Contract(address, ABIS.CoreOracle);
}

export const getMultiBToken = (address: string): Contract => {
  return new Contract(address, ABIS.BErc20);
}

export const getMultiSafeBox = (address: string): Contract => {
  return new Contract(address, ABIS.SafeBox);
}