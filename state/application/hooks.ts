import { useSelector, useDispatch } from 'react-redux';
import { ChainId } from '../../constant';
import { useActiveWeb3React } from '../../hooks';
import { AppState } from '../index';

export function useBlockNumber(): number {
  const { chainId } = useActiveWeb3React();
  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? ChainId.Mainnet] || 0);
}