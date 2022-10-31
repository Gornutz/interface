import { BigNumber } from "ethers";

export interface IPosition {
    owner: string,
    positionId: number,
    collToken: string,
    underlyingToken: string,
    underlyingAmount: BigNumber,
    underlyingcTokenAmount: BigNumber,
    collId: string,
    collateralSize: BigNumber,
    debtMap: string,
    debtValue: BigNumber,
    risk: number,
}