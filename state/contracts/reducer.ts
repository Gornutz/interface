import { createReducer } from "@reduxjs/toolkit"
import { IPosition } from "../../interfaces";
import { updateLeveragePositions } from "./actions";

export interface ContractState {
	leveragePositions: IPosition[];
}

const initialState: ContractState = {
	leveragePositions: []
}

export default createReducer(initialState, builder => 
	builder.addCase(updateLeveragePositions, (state, action) => {
		state.leveragePositions = action.payload;
	})
);