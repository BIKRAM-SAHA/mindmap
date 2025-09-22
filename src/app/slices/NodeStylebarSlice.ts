import { RootState } from "@app/store";
import { BUTTON_TYPE } from "@appTypes/NodeStyle.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
