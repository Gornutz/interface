import { createReducer } from "@reduxjs/toolkit"
import { BigNumber, ethers } from "ethers";
import { ILendingPool, ILevPosition } from "interfaces";
import {
  updateBalances,
  updateEthBalance,
  updateLendingPoolInfo,
  updateLeveragePoolIRR,
  updateLeveragePoolTVLs,
  updateLeveragePositions,
  updateTokenPrices
} from "./actions";

export interface ContractState {
  ethBalance: BigNumber;
  tokenPrices: Record<string, BigNumber>;         // token addr => 1e18 based price
  balances: Record<string, BigNumber>;            // token addr => balance

  // Leverage Pools
  leveragePositions: ILevPosition[];
  leveragePoolTVL: Record<string, BigNumber>;     // pool key => TVL
  leveragePoolIRR: Record<string, number>;        // pool key => IRR

  // Lending Pools
  lendingPoolInfo: Record<string, ILendingPool>
}

const initialState: ContractState = {
  ethBalance: ethers.constants.Zero,
  tokenPrices: {},
  balances: {},

  leveragePositions: [],
  leveragePoolTVL: {},
  leveragePoolIRR: {},

  lendingPoolInfo: {},
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateEthBalance, (state, action) => {
      state.ethBalance = action.payload.balance;
    }).addCase(updateTokenPrices, (state, action) => {
      Object.keys(action.payload).forEach(tokenAddr => {
        if (!state.tokenPrices) state.tokenPrices = {}
        state.tokenPrices[tokenAddr.toLowerCase()] = action.payload[tokenAddr];
      })
    }).addCase(updateBalances, (state, action) => {
      Object.keys(action.payload).forEach(tokenAddr => {
        if (!state.balances) state.balances = {}
        state.balances[tokenAddr.toLowerCase()] = action.payload[tokenAddr];
      })
    }).addCase(updateLeveragePositions, (state, action) => {
      state.leveragePositions = action.payload;
    }).addCase(updateLeveragePoolTVLs, (state, action) => {
      if (!state.leveragePoolTVL) state.leveragePoolTVL = {}
      state.leveragePoolTVL = action.payload;
    }).addCase(updateLeveragePoolIRR, (state, action) => {
      if (!state.leveragePoolTVL) state.leveragePoolTVL = {}
      state.leveragePoolIRR = action.payload;
    }).addCase(updateLendingPoolInfo, (state, action) => {
      if (!state.lendingPoolInfo) state.lendingPoolInfo = {}
      state.lendingPoolInfo = action.payload;
    })
);