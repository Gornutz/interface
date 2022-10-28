import { BigNumber } from "ethers";

export interface ILevPosition {
    owner: string,
    positionId: number,
    collToken: string,
    underlyingToken: string,
    underlyingAmount: BigNumber,
    underlyingcTokenAmount: BigNumber,
    collId: BigNumber,
    collateralSize: BigNumber,
    debtMap: string,
    debtValue: BigNumber,
    health: number,
    cv: BigNumber;                      // Current Position Value in USD
    bankKey: string;
    safeBoxKey: string;
    weeklyEarningsUSD: BigNumber;
    apy: number;
    equitySum: BigNumber;
}