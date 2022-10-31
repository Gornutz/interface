import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId, DEFAULT_CHAIN, NETWORK_CONNECTIONS, SUPPORTED_CHAINS } from '../constant';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONNECTIONS[DEFAULT_CHAIN])

export type Web3Ethers = ReturnType<typeof useWeb3React> & { library?: Web3Provider; chainId?: ChainId }

export const useEthers = (): Web3Ethers => useWeb3React<Web3Provider>()

export const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const initProvider = () => {
    if (library === undefined) {
      return simpleRpcProvider;
    } else if (SUPPORTED_CHAINS.includes(chainId)) {
      return new ethers.providers.Web3Provider(library.provider) || simpleRpcProvider;
    } else {
      return simpleRpcProvider;
    }
  }
  const [provider, setProvider] = useState<any>(initProvider());

  useEffect(() => {
    if (library === undefined) {
      setProvider(simpleRpcProvider);
    } else if (SUPPORTED_CHAINS.includes(chainId)) {
      setProvider(new ethers.providers.Web3Provider(library.provider) || simpleRpcProvider);
    } else {
      setProvider(simpleRpcProvider);
    }
  }, [library, chainId])

  return { library: provider, chainId: chainId ?? DEFAULT_CHAIN, ...web3React }
}