export default interface IPositionStruct {
    owner: string,
    collToken: string,
    underlyingToken: string,
    underlyingAmount: string,
    underlyingcTokenAmount: string,
    collId: string,
    collateralSize: string,
    debtMap: string,
    positionId: number,
    debtValue: number,
}