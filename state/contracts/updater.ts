import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADDRESS, BANKS, BANK_CONFIG, bTokens, PRECISION_18, SAFE_BOX, TOKENS } from "constant";
import { simpleRpcProvider, useActiveWeb3React, useBlockNumber, useLeveragePoolIRRs } from "hooks";
import { ILendingPool, ILevPosition } from "interfaces";
import {
  MulticallProvider,
  getMultiBank,
  getMultiBToken,
  getMultiCoreOracle,
  getMultiERC20Contract,
  getMultiSafeBox,
  getIchiAngelVaultInfo,
  getBankByColId,
  getSafeBoxBycToken
} from "utils";
import {
  updateBalances,
  updateEthBalance,
  updateLendingPoolInfo,
  updateLeveragePoolIRR,
  updateLeveragePoolTVLs,
  updateLeveragePositions,
  updateTokenPrices
} from "./actions";

export default function Updater(): null {
  const dispatch = useDispatch();
  const blocknumber = useBlockNumber();
  const { account, chainId } = useActiveWeb3React();
  const multicall = MulticallProvider;

  const [extCallCount, setExtCallCount] = useState(0);
  const vaultIRRs = useLeveragePoolIRRs();

  useEffect(() => {
    setExtCallCount((extCallCount + 1) % 20);
    console.log(
      `Fetching contract states at Blocknumber ${blocknumber} of ChainId ${chainId}`
    );
    const activeAccount = account || ethers.constants.AddressZero;

    // Get Eth Balance
    simpleRpcProvider.getBalance(activeAccount).then(balance => {
      dispatch(updateEthBalance({
        chainId,
        balance: activeAccount === ethers.constants.AddressZero ? ethers.constants.Zero : balance
      }));
    })

    // ===== Web3 Multicall ===== //
    let contractCalls: any[] = [];

    // 1. Add token price calls
    const coreOracle = getMultiCoreOracle(ADDRESS[chainId].CORE_ORACLE);
    BANK_CONFIG[chainId].SUPPORTED_TOKENS.forEach(token => {
      contractCalls.push(coreOracle.getPrice(token.ADDR));
    })

    // 2. Add bTokens' exchange rate calls
    Object.keys(bTokens[chainId]).forEach(bTokenName => {
      const bToken = getMultiBToken(bTokens[chainId][bTokenName].ADDR);
      contractCalls.push(bToken.exchangeRateStored());
    })

    // 3. Add token balance calls
    Object.keys(TOKENS[chainId]).forEach(key => {
      const token = getMultiERC20Contract(TOKENS[chainId][key].ADDR);
      contractCalls.push(token.balanceOf(activeAccount));
    })

    // 4. Add Lending pool calls
    Object.keys(SAFE_BOX[chainId]).forEach(key => {
      const safeBox = getMultiSafeBox(SAFE_BOX[chainId][key].ADDR);
      contractCalls.push(safeBox.balanceOf(activeAccount));
      const uToken = getMultiERC20Contract(SAFE_BOX[chainId][key].cTOKEN.uTOKEN.ADDR);
      contractCalls.push(uToken.balanceOf(SAFE_BOX[chainId][key].cTOKEN.ADDR));
      const bToken = getMultiBToken(SAFE_BOX[chainId][key].cTOKEN.ADDR);
      contractCalls.push(bToken.borrowBalanceStored(ADDRESS[chainId].BANK));
      contractCalls.push(bToken.borrowRatePerBlock());
      contractCalls.push(bToken.supplyRatePerBlock());
    })

    // 5. Add Leverage Pool tvl calls
    Object.keys(BANKS[chainId]).forEach(key => {
      const lpContract = getMultiERC20Contract(BANKS[chainId][key].LP);
      contractCalls.push(lpContract.balanceOf(BANKS[chainId][key].WRAPPER));
      contractCalls.push(coreOracle.getPrice(BANKS[chainId][key].LP));
    })

    // 6. Add total position id call
    const bankContract = getMultiBank(ADDRESS[chainId].BANK);
    contractCalls.push(bankContract.nextPositionId());

    multicall.all(contractCalls).then(results => {
      let index = 0;

      // 1. Extract token prices
      const tokenPrices: Record<string, BigNumber> = {};
      BANK_CONFIG[chainId].SUPPORTED_TOKENS.forEach(token => {
        tokenPrices[token.ADDR.toLowerCase()] = results[index++];
      })

      // 2. Extract bTokens' exchangeRates
      const exchangeRates: Record<string, BigNumber> = {};
      Object.keys(bTokens[chainId]).forEach(bTokenName => {
        const exchangeRate = results[index++]; // scaled 1e18
        exchangeRates[bTokens[chainId][bTokenName].ADDR.toLowerCase()] = exchangeRate;
        const underlyingToken = bTokens[chainId][bTokenName].uTOKEN.ADDR.toLowerCase();
        const bTokenPrice = !tokenPrices[underlyingToken] ? ethers.constants.Zero :
          BigNumber.from(tokenPrices[underlyingToken])
            .mul(exchangeRate)
            .div(BigNumber.from(10).pow(bTokens[chainId][bTokenName].DECIMALS));
        tokenPrices[bTokens[chainId][bTokenName].ADDR.toLowerCase()] = bTokenPrice;
      })
      dispatch(updateTokenPrices(tokenPrices));

      // 3. Extract token balances
      const balances: Record<string, BigNumber> = {};
      Object.keys(TOKENS[chainId]).forEach(key => {
        balances[TOKENS[chainId][key].ADDR.toLowerCase()] = results[index++];
      })
      dispatch(updateBalances(balances));

      // 4. Extract lending pool balances
      const lendingPoolInfo: {
        [key: string]: ILendingPool
      } = {};
      Object.keys(SAFE_BOX[chainId]).forEach(key => {
        const myPoolBalance = results[index++];
        const totalReserve = results[index++];
        const totalBorrow = results[index++];
        const borrowRatePerBlock = results[index++];
        const supplyRatePerBlock = results[index++];
        const borrowApy = ((1e18 + BigNumber.from(borrowRatePerBlock).toNumber()) / 1e18) ** 2102400 - 1;
        const supplyApy = ((1e18 + BigNumber.from(supplyRatePerBlock).toNumber()) / 1e18) ** 2102400 - 1;
        const totalSupply = BigNumber.from(totalReserve).add(totalBorrow);
        const utilization = totalSupply.isZero() ? 0 :
          BigNumber.from(totalBorrow).mul(10000).div(totalSupply).toNumber();
        const uTokenPrice = tokenPrices[SAFE_BOX[chainId][key].cTOKEN.uTOKEN.ADDR.toLowerCase()] || ethers.constants.Zero;
        const cTokenPrice = tokenPrices[SAFE_BOX[chainId][key].cTOKEN.ADDR.toLowerCase()] || ethers.constants.Zero;
        const tvl = totalSupply.mul(uTokenPrice).div(BigNumber.from(10).pow(SAFE_BOX[chainId][key].DECIMAL));
        const totalBorrowUSD = BigNumber.from(totalBorrow).mul(uTokenPrice).div(PRECISION_18);
        const myPoolBalanceUSD = BigNumber.from(myPoolBalance).mul(cTokenPrice).div(PRECISION_18);
        const myWeeklyEarningsUSD = BigNumber.from(myPoolBalance).mul(cTokenPrice)
          .mul((supplyApy * 100).toFixed(0))
          .div(10000).div(52).div(PRECISION_18);

        lendingPoolInfo[SAFE_BOX[chainId][key].ADDR.toLowerCase()] = {
          borrowApy: borrowApy * 100,
          supplyApy: supplyApy * 100,
          totalSupply,
          totalBorrow,
          totalBorrowUSD,
          utilization,
          tvl,
          myPoolBalance,
          myPoolBalanceUSD,
          myWeeklyEarningsUSD
        }
      })
      dispatch(updateLendingPoolInfo(lendingPoolInfo));

      // 5. Extract leverage pool tvls
      const leveragePoolTVLs: { [key: string]: BigNumber } = {};
      Object.keys(BANKS[chainId]).forEach(key => {
        const balance = results[index++];
        const price = results[index++];
        leveragePoolTVLs[key] = BigNumber.from(balance).mul(price).div(PRECISION_18);
      })
      dispatch(updateLeveragePoolTVLs(leveragePoolTVLs));

      // 6. Add contract calls of position details
      const nextPositionId = results[index++];
      contractCalls = [];
      for (let i = 1; i < +nextPositionId; i++) {
        contractCalls.push(bankContract.positions(i));
        contractCalls.push(bankContract.getCollateralValue(i));
        contractCalls.push(bankContract.getDebtValue(i));
        contractCalls.push(bankContract.getPositionRisk(i));
      }
      multicall.all(contractCalls).then((results) => {
        const myPositions: ILevPosition[] = [];
        let index = 0;
        for (let i = 1; i < +nextPositionId; i++) {
          const position = results[index++];
          const cv: BigNumber = results[index++];
          const debt: BigNumber = results[index++];
          const risk: BigNumber = results[index++];
          if (position.owner === account) {
            const bankKey = getBankByColId(chainId, position.collToken, position.collId);
            const vaultIRR = vaultIRRs[BANKS[chainId][bankKey].LP.toLowerCase()] || 0;
            const safeBoxKey = getSafeBoxBycToken(chainId, BANKS[chainId][bankKey].cTOKEN.ADDR);
            const borrowApy = lendingPoolInfo[SAFE_BOX[chainId][safeBoxKey].ADDR.toLowerCase()].borrowApy;
            const supplyApy = lendingPoolInfo[SAFE_BOX[chainId][safeBoxKey].ADDR.toLowerCase()].supplyApy;
            const weeklyVaultRewards = cv.mul((vaultIRR * 100).toFixed(0)).div(10000).div(52);
            const weeklyDebt = BigNumber.from(debt).mul((borrowApy * 100).toFixed(0)).div(10000).div(52);
            const weeklySupply = BigNumber.from(position.underlyingAmount).mul((supplyApy * 100).toFixed(0)).div(10000).div(52);
            const weeklyRewards = weeklyVaultRewards.add(weeklySupply).sub(weeklyDebt);
            const apy = weeklyRewards.mul(52).mul(10000).div(cv).toNumber() / 100;

            myPositions.push({
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
              health: 100 - risk.toNumber() / 100,
              cv,
              bankKey,
              safeBoxKey,
              weeklyEarningsUSD: weeklyRewards,
              apy,
              equitySum: BigNumber.from(position.underlyingAmount).add(cv).sub(debt)
            });
          }
        }
        console.log('MyPositions:', myPositions);
        dispatch(updateLeveragePositions(myPositions));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocknumber, account, chainId, dispatch, multicall]);

  useEffect(() => {
    if (extCallCount % 3 === 1) {
      Promise.all(Object.keys(BANKS[chainId]).map(key => {
        return getIchiAngelVaultInfo(BANKS[chainId][key].POOL_ID);
      })).then(poolInfos => {
        const vaultIRRs: { [key: string]: number } = {};
        Object.keys(BANKS[chainId]).forEach((key, index) => {
          vaultIRRs[BANKS[chainId][key].LP.toLowerCase()] = poolInfos[index];
        })
        dispatch(updateLeveragePoolIRR(vaultIRRs));
      })
    }
  }, [extCallCount, chainId, dispatch])

  return null;
}