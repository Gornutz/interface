import { ethers, BigNumber, utils } from 'ethers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADDRESS } from '../../constant';
import { useActiveWeb3React } from '../../hooks';
import { IPosition } from '../../interfaces';
import { MulticallProvider } from '../../utils';
import { getMultiBank } from '../../utils/multicallHelper';
import { useBlockNumber } from '../application/hooks';
import { updateLeveragePositions } from './actions';

export default function Updater(): null {
	const dispatch = useDispatch();
	const blocknumber = useBlockNumber();
	const { account, chainId } = useActiveWeb3React();
	const multicall = MulticallProvider;

	useEffect(() => {
		console.log(`Fetching contract states at Blocknumber ${blocknumber} of ChainId ${chainId}`);
		let contractCalls: any[] = [];
		const bankContract = getMultiBank(ADDRESS[chainId].BANK);

		contractCalls.push(bankContract.nextPositionId());
		multicall.all(contractCalls).then(nextPositionId => {
			console.log(+nextPositionId);
			contractCalls = [];
			for(let i = 1; i< +nextPositionId; i++) {
				contractCalls.push(bankContract.positions(i));
				contractCalls.push(bankContract.getDebtValue(i));
				contractCalls.push(bankContract.getPositionRisk(i));
			}
			multicall.all(contractCalls).then(results => {
				const myPositions: IPosition[] = [];
				let index = 0;
				for(let i = 1; i< +nextPositionId; i++) {
					const position = results[index++];
					const debt: BigNumber = results[index++];
					const risk: BigNumber = results[index++];
					position.owner === account && myPositions.push({
						owner: position.owner,
						positionId: i,
						collId: position.collId,
						collToken: position.collToken,
						collateralSize: position.collateralSize,
						underlyingAmount: position.underlyingAmount,
						underlyingcTokenAmount: position.underlyingcTokenAmount,
						underlyingToken: position.underlyingToken,
						debtMap: position.debtMap,
						debtValue: debt,
						risk: risk.toNumber()
					})
				}
				console.log(myPositions);
				dispatch(updateLeveragePositions(myPositions));
			});
		})
	}, [blocknumber, account, chainId, dispatch, multicall])

	return null;
}