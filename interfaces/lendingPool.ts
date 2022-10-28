import { BigNumber } from "ethers";

export interface ILendingPool {
  borrowApy: number;
  supplyApy: number;
  totalSupply: BigNumber;
  totalBorrow: BigNumber;
  totalBorrowUSD: BigNumber;
  utilization: number;
  tvl: BigNumber; // totalSupplyUSD

  myPoolBalance: BigNumber;
  myPoolBalanceUSD: BigNumber;
  myWeeklyEarningsUSD: BigNumber;
}