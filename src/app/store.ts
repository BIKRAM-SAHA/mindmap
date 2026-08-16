import { configureStore } from '@reduxjs/toolkit'
import { mindmapReducer } from './slices/MindMapSlice'
import { nodeStylebarReducer } from './slices/NodeStylebarSlice'
import { modeReducer } from './slices/ModeSlice'
import { viewportReducer } from './slices/ViewportSlice'

const store = configureStore({
    reducer: {
        mindmap: mindmapReducer,
        nodeStylebar: nodeStylebarReducer,
        viewportSlice: viewportReducer,
        mode: modeReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
