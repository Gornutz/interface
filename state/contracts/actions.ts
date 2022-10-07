import { createAction } from "@reduxjs/toolkit";
import { IPositionStruct } from "../../interfaces";

export const updateLeveragePositions = createAction<IPositionStruct[]>('contract/updateLeveragePositions');