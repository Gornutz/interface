import { createAction } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { ILendingPool, ILevPosition } from "interfaces";

export const updateEthBalance = createAction<{
  chainId: number;
  balance: BigNumber;
}>('contract/updateEthBalance');

// Token Actions
export const updateTokenPrices = createAction<Record<string, BigNumber>>('contract/updateTokenPrices');

export const updateTotalTvl = createAction<BigNumber>('contract/updateTotalTvl');

export const updateBalances = createAction<Record<string, BigNumber>>('contract/updateBalances');

// Leverage Pool Actions
export const updateLeveragePositions = createAction<ILevPosition[]>('contract/updateLeveragePositions');

export const updateLeveragePoolTVLs = createAction<{
  [key: string]: BigNumber
}>('contract/updateLeveragePoolTVLs');

export const updateLeveragePoolIRR = createAction<{
  [key: string]: number
}>('contract/updateLeveragePoolIRR');

// Lending Pool Actions
export const updateLendingPoolInfo = createAction<{
  [key: string]: ILendingPool
}>('contract/updateLendingPoolInfo');
