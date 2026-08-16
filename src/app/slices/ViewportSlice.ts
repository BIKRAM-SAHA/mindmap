import { RootState } from '@app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ViewportSlice = {
    isPanActive: boolean
    x: number
    y: number
    scale: number
}

const initialState: ViewportSlice = {
    isPanActive: false,
    x: 0,
    y: 0,
    scale: 100,
}

const MAX_SCALE = 500
const MIN_SCALE = 100

const viewportSlice = createSlice({
    name: 'nodeStylebar',
    initialState,
    reducers: {
        startPan: (state) => {
            state.isPanActive = true
        },
        endPan: (state) => {
            state.isPanActive = false
        },
        pan: (state, action: PayloadAction<{ dx: number; dy: number }>) => {
            if (state.isPanActive) {
                state.x += action.payload.dx
                state.y += action.payload.dy
            }
        },
        zoom: (
            state,
            action: PayloadAction<{
                scale: number
                mouseX: number
                mouseY: number
            }>
        ) => {
            const oldScale = state.scale
            const newScale = Math.min(
                MAX_SCALE,
                Math.max(MIN_SCALE, action.payload.scale)
            )
            const oldX = state.x
            const oldY = state.y
            const { mouseX: newX, mouseY: newY } = action.payload

            state.x = newX - (newX - oldX) * (newScale / oldScale)
            state.y = newY - (newY - oldY) * (newScale / oldScale)
            state.scale = newScale
        },
    },
})

export const { pan, zoom, startPan, endPan } = viewportSlice.actions
export const selectScale = (state: RootState) => state.viewportSlice.scale
export const selectPanX = (state: RootState) => state.viewportSlice.x
export const selectPanY = (state: RootState) => state.viewportSlice.y
export const selectIsPanActive = (state: RootState) =>
    state.viewportSlice.isPanActive
export const viewportReducer = viewportSlice.reducer
