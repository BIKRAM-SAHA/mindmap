import { RootState } from "@app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum BUTTON_TYPE {
	FILL_ICON = "FILL_ICON",
	TEXT_ICON = "TEXT_ICON",
	LINE_ICON = "LINE_ICON",
}

type NodeStylebarSlice = {
	selectedButton: BUTTON_TYPE | null;
};

const initialState: NodeStylebarSlice = {
	selectedButton: null,
};

const nodeStylebarSlice = createSlice({
	name: "nodeStylebar",
	initialState,
	reducers: {
		changeSelectedButton: (
			state,
			action: PayloadAction<BUTTON_TYPE | null>
		) => {
			state.selectedButton = action.payload;
		},
	},
});

export const { changeSelectedButton } = nodeStylebarSlice.actions;
export const selectNodeStylebar = (state: RootState) => state.nodeStylebar;
export const nodeStylebarReducer = nodeStylebarSlice.reducer;
