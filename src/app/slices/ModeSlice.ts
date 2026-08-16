import { RootState } from '@app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type NORMAL_MODE = {
    type: 'normal'
}

type INSERT_MODE = {
    type: 'insert'
    nodeIdBeingEdited: string
}

type KeyboardMode = NORMAL_MODE | INSERT_MODE
type MouseMode = 'PAN' | 'SELECT'

type ModeSlice = {
    keyboardMode: KeyboardMode
    mouseMode: MouseMode
}

const initialState: ModeSlice = {
    keyboardMode: { type: 'normal' },
    mouseMode: 'SELECT',
}

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeKeyboardMode: (state, action: PayloadAction<KeyboardMode>) => {
            state.keyboardMode = action.payload
        },
        changeMouseMode: (state, action: PayloadAction<MouseMode>) => {
            state.mouseMode = action.payload
        },
    },
})

export const { changeKeyboardMode, changeMouseMode } = modeSlice.actions
export const selectKeyboardMode = (state: RootState) => state.mode.keyboardMode
export const selectMouseMode = (state: RootState) => state.mode.mouseMode
export const modeReducer = modeSlice.reducer
