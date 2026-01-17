import { configureStore } from '@reduxjs/toolkit'
import { mindmapReducer } from './slices/MindMapSlice'
import { nodeStylebarReducer } from './slices/NodeStylebarSlice'

const store = configureStore({
    reducer: {
        mindmap: mindmapReducer,
        nodeStylebar: nodeStylebarReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
