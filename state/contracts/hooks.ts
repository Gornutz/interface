import { useSelector } from "react-redux";
import { AppState } from "..";
import { IPosition } from "../../interfaces";

export const useLeveragePositions = (): IPosition[] => {
	return useSelector((state: AppState) => state.contracts.leveragePositions || []);
}