import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AbsolutePoint } from '@modules/graphics/common/index.types'
import { RootState } from '@app/store'
import { notifyError } from '@modules/notifications'
import { v4 as uuid } from 'uuid'
import graphDS from '@app/utils/graphDS'

type Node = {
    id: string
    parentId: null | string
    content: string
    meta: {
        position: AbsolutePoint
        fillColor: string
        lineColor: string
        lineWidth: number
        textColor: string
    }
}

type mindmapSlice = {
    activeNodeId: null | string
    nodes: Node[]
    childAdjacencyList: Record<string, string[]>
}

type Connector = {
    id: string
    fromPosition: AbsolutePoint
    toPosition: AbsolutePoint
}

const ROOT_NODE_ID = uuid()

const initialState: mindmapSlice = {
    activeNodeId: null,
    nodes: [
        {
            id: ROOT_NODE_ID,
            parentId: null,
            content: 'Root',
            meta: {
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                },
                fillColor: '#ffffff',
                lineColor: '#000000',
                lineWidth: 2,
                textColor: '#000000',
            },
        },
    ],
    childAdjacencyList: { [ROOT_NODE_ID]: [] },
}

const mindMapSlice = createSlice({
    name: 'mindmap',
    initialState,
    reducers: {
        addChild: (state) => {
            const parentNodeId = state.activeNodeId
            if (parentNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const newNodeId = uuid()
            state.nodes.push({
                id: newNodeId,
                parentId: parentNodeId,
                content: 'New Node',
                meta: {
                    position: {
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                    },
                    fillColor: '#ffffff',
                    lineColor: '#000000',
                    lineWidth: 2,
                    textColor: '#000000',
                },
            })
            state.childAdjacencyList[newNodeId] = []
            state.childAdjacencyList[parentNodeId].push(newNodeId)
            state.activeNodeId = newNodeId
        },
        removeNode: (state, action: PayloadAction<string | null>) => {
            const nodeId = action.payload
            if (nodeId === null) {
                notifyError('No Node Selected')
                return
            }
            if (nodeId === state.nodes[0].id) {
                notifyError('Cannot delete Root')
                return
            }
            const node = state.nodes.find((node) => node.id === nodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            const parentNodeId = node.parentId
            state.childAdjacencyList = graphDS.removeNode(
                state.nodes,
                state.childAdjacencyList,
                nodeId
            )
            mindMapSlice.caseReducers.changeActiveNode(state, {
                type: 'changeActiveNode',
                payload: parentNodeId,
            })
        },
        addSibling: (state) => {
            const nodeId = state.activeNodeId
            if (nodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === nodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            const parentNodeId = node.parentId
            if (parentNodeId === null) {
                notifyError('Cannot add sibling for Root')
                return
            }
            const newNodeId = uuid()
            state.nodes.push({
                id: newNodeId,
                parentId: parentNodeId,
                content: 'New Node',
                meta: {
                    position: {
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                    },
                    fillColor: '#ffffff',
                    lineColor: '#000000',
                    lineWidth: 2,
                    textColor: '#000000',
                },
            })
            state.childAdjacencyList[newNodeId] = []
            state.childAdjacencyList[parentNodeId].push(newNodeId)
            state.activeNodeId = newNodeId
        },
        changeActiveNode: (state, action: PayloadAction<string | null>) => {
            const newActiveNodeId = action.payload
            if (
                newActiveNodeId !== null &&
                !state.nodes.find((item) => item.id === newActiveNodeId)
            ) {
                throw new Error('Invalid newActiveNodeId passed')
            }

            state.activeNodeId = action.payload
        },
        goToNextSibling: (state) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            const parentNodeId = node.parentId
            if (parentNodeId === null) {
                notifyError('Cannot go to sibling of Root')
                return
            }
            const totalChildren = state.childAdjacencyList[parentNodeId].length
            const indexOfActiveChild = state.childAdjacencyList[
                parentNodeId
            ].findIndex((id) => id === activeNodeId)
            if (indexOfActiveChild === -1) {
                throw new Error('Active Node is not a child')
            }
            const siblingNodeId =
                state.childAdjacencyList[parentNodeId][
                    (indexOfActiveChild + 1) % totalChildren
                ]
            state.activeNodeId = siblingNodeId
        },
        goToPrevSibling: (state) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            const parentNodeId = node.parentId
            if (parentNodeId === null) {
                notifyError('Cannot go to sibling of Root')
                return
            }
            const totalChildren = state.childAdjacencyList[parentNodeId].length
            const indexOfActiveChild = state.childAdjacencyList[
                parentNodeId
            ].findIndex((id) => id === activeNodeId)
            if (indexOfActiveChild === -1) {
                throw new Error('Active Node is not a child')
            }
            const siblingNodeId =
                state.childAdjacencyList[parentNodeId][
                    (totalChildren + indexOfActiveChild - 1) % totalChildren
                ]
            state.activeNodeId = siblingNodeId
        },
        goToParent: (state) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            const parentNodeId = node.parentId
            if (parentNodeId === null) {
                notifyError('Cannot go to parent of Root')
                return
            }
            state.activeNodeId = parentNodeId
        },
        goToChild: (state) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }

            const childNodeId =
                state.childAdjacencyList[activeNodeId][0] ?? null
            if (childNodeId === null) {
                notifyError('Cannot go to child of Leaf')
                return
            }
            state.activeNodeId = childNodeId
        },
        onTextChange: (state, action: PayloadAction<string>) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }

            node.content = action.payload
        },
        onMoveNode: (
            state,
            action: PayloadAction<{ dx: number; dy: number; zoom: number }>
        ) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }

            const { dx, dy, zoom } = action.payload
            const { x: prevX, y: prevY } = node.meta.position
            const newX = prevX + dx / zoom
            const newY = prevY + dy / zoom
            node.meta.position = { x: newX, y: newY }
        },
        onLineColorChange: (state, action: PayloadAction<string>) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }

            node.meta.lineColor = action.payload
        },
        onLineWidthChange: (state, action: PayloadAction<number>) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }

            node.meta.lineWidth = action.payload
        },
        onFillColorChange: (state, action: PayloadAction<string>) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }

            node.meta.fillColor = action.payload
        },
        onTextColorChange: (state, action: PayloadAction<string>) => {
            const activeNodeId = state.activeNodeId
            if (activeNodeId === null) {
                notifyError('No Node Selected')
                return
            }
            const node = state.nodes.find((node) => node.id === activeNodeId)
            if (!node) {
                throw new Error('Invalid Node Selected')
            }
            node.meta.textColor = action.payload
        },
    },
})

export const {
    addChild,
    addSibling,
    changeActiveNode,
    goToParent,
    goToChild,
    goToNextSibling,
    goToPrevSibling,
    onFillColorChange,
    onLineColorChange,
    onLineWidthChange,
    onMoveNode,
    onTextChange,
    onTextColorChange,
    removeNode,
} = mindMapSlice.actions
export const selectMindMap = (state: RootState) => state.mindmap
export const selectMindMapNodes = (state: RootState) => state.mindmap.nodes
export const selectMindMapChildAdjacencyList = (state: RootState) =>
    state.mindmap.childAdjacencyList
export const selectMindMapActiveNodeId = (state: RootState) =>
    state.mindmap.activeNodeId
export const selectMindMapActiveNode = (state: RootState) =>
    state.mindmap.nodes.find((item) => item.id === state.mindmap.activeNodeId)
export const selectMindMapConnectors = createSelector(
    [selectMindMapNodes, selectMindMapChildAdjacencyList],
    (nodes, childAdjacencyList) => {
        const indexToNodeMap = new Map<string, Node>()
        for (const node of nodes) {
            indexToNodeMap.set(node.id, node)
        }
        const connectors: Connector[] = []

        Object.entries(childAdjacencyList).forEach(([fromNodeId, list]) => {
            const fromNode = indexToNodeMap.get(fromNodeId)
            if (!fromNode)
                throw new Error('Something went wrong in selecting connectors')
            list.forEach((toNodeId) => {
                const toNode = indexToNodeMap.get(toNodeId)
                if (!toNode)
                    throw new Error(
                        'Something went wrong in selecting connectors'
                    )
                connectors.push({
                    id: fromNode.id + '-' + toNode.id,
                    fromPosition: fromNode?.meta.position,
                    toPosition: toNode?.meta.position,
                })
            })
        })

        return connectors
    }
)
export const mindmapReducer = mindMapSlice.reducer
