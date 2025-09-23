import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { centerX, centerY } from "@modules/graphics/common/index.constants";
import { AbsolutePoint } from "@modules/graphics/common/index.types";
import { RootState } from "@app/store";
import { notifyError } from "@modules/notifications";

type Node = {
	idx: number;
	parentIdx: null | number;
	content: string;
	meta: {
		position: AbsolutePoint;
		fillColor: string;
		lineColor: string;
		lineWidth: number;
		textColor: string;
	};
};

type mindmapSlice = {
	activeNodeIdx: null | number;
	mode: Mode;
	nodes: Node[];
	childAdjacencyList: number[][];
};

type Connector = {
	id: string;
	fromPosition: AbsolutePoint;
	toPosition: AbsolutePoint;
};

type NORMAL_MODE = {
	type: "normal";
};

type INSERT_MODE = {
	type: "insert";
	nodeIdxBeingEdited: number;
};

type Mode = NORMAL_MODE | INSERT_MODE;

const initialState: mindmapSlice = {
	activeNodeIdx: 0,
	mode: { type: "normal" },
	nodes: [
		{
			idx: 0,
			parentIdx: null,
			content: "Root",
			meta: {
				position: { x: centerX, y: centerY },
				fillColor: "#ffffff",
				lineColor: "#000000",
				lineWidth: 2,
				textColor: "#000000",
			},
		},
	],
	childAdjacencyList: [[]],
};

const mindMapSlice = createSlice({
	name: "mindmap",
	initialState,
	reducers: {
		addChild: (state) => {
			const parentNodeIdx = state.activeNodeIdx;
			if (parentNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const newNodeIdx = state.nodes.length;
			state.nodes.push({
				idx: newNodeIdx,
				parentIdx: parentNodeIdx,
				content: "New Node",
				meta: {
					position: { x: centerX, y: centerY },
					fillColor: "#ffffff",
					lineColor: "#000000",
					lineWidth: 2,
					textColor: "#000000",
				},
			});
			state.childAdjacencyList.push([]);
			state.childAdjacencyList[parentNodeIdx].push(newNodeIdx);
			state.activeNodeIdx = newNodeIdx;
		},
		removeNode: (state) => {
			const nodeIdx = state.activeNodeIdx;
			if (nodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}
			if (nodeIdx === 0) {
				notifyError("Cannot delete Root");
				return;
			}

			state.nodes.splice(nodeIdx, 1);
			state.childAdjacencyList.splice(nodeIdx, 1);
		},
		addSibling: (state) => {
			const nodeIdx = state.activeNodeIdx;
			if (nodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const parentNodeIdx = state.nodes[nodeIdx].parentIdx;
			if (parentNodeIdx === null) {
				notifyError("Cannot add sibling for Root");
				return;
			}

			const newNodeIdx = state.nodes.length;
			state.nodes.push({
				idx: newNodeIdx,
				parentIdx: parentNodeIdx,
				content: "New Node",
				meta: {
					position: { x: centerX, y: centerY },
					fillColor: "#ffffff",
					lineColor: "#000000",
					lineWidth: 2,
					textColor: "#000000",
				},
			});
			state.childAdjacencyList.push([]);
			state.childAdjacencyList[parentNodeIdx].push(newNodeIdx);
			state.activeNodeIdx = newNodeIdx;
		},
		changeActiveNode: (state, action: PayloadAction<number | null>) => {
			const newActiveNode = action.payload;
			if (
				newActiveNode !== null &&
				(newActiveNode < 0 || newActiveNode > state.nodes.length)
			) {
				notifyError("Invalid node selected");
				return;
			}

			state.activeNodeIdx = action.payload;
		},
		goToNextSibling: (state) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const parentNodeIdx = state.nodes[activeNodeIdx].parentIdx;
			if (parentNodeIdx === null) {
				notifyError("Cannot go to sibling of Root");
				return;
			}
			const siblingNodeIdx =
				(activeNodeIdx + 1) %
				state.childAdjacencyList[parentNodeIdx].length;
			state.activeNodeIdx = siblingNodeIdx;
		},
		goToPrevSibling: (state) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const parentNodeIdx = state.nodes[activeNodeIdx].parentIdx;
			if (parentNodeIdx === null) {
				notifyError("Cannot go to sibling of Root");
				return;
			}
			const siblingNodeIdx =
				(activeNodeIdx + 1) %
				state.childAdjacencyList[parentNodeIdx].length;
			state.activeNodeIdx = siblingNodeIdx;
		},
		goToParent: (state) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const parentNodeIdx = state.nodes[activeNodeIdx].parentIdx;
			if (parentNodeIdx === null) {
				notifyError("Cannot go to parent of Root");
				return;
			}
			state.activeNodeIdx = parentNodeIdx;
		},
		goToChild: (state) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			const childNodeIdx =
				state.childAdjacencyList[activeNodeIdx][0] ?? null;
			if (childNodeIdx === null) {
				notifyError("Cannot go to child of Leaf");
				return;
			}
			state.activeNodeIdx = childNodeIdx;
		},
		onTextChange: (state, action: PayloadAction<string>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].content = action.payload;
		},
		onMoveNode: (state, action: PayloadAction<AbsolutePoint>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].meta.position = action.payload;
		},
		onLineColorChange: (state, action: PayloadAction<string>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].meta.lineColor = action.payload;
		},
		onLineWidthChange: (state, action: PayloadAction<number>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].meta.lineWidth = action.payload;
		},
		onFillColorChange: (state, action: PayloadAction<string>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].meta.fillColor = action.payload;
		},
		onTextColorChange: (state, action: PayloadAction<string>) => {
			const activeNodeIdx = state.activeNodeIdx;
			if (activeNodeIdx === null) {
				notifyError("No Node Selected");
				return;
			}

			state.nodes[activeNodeIdx].meta.textColor = action.payload;
		},
		changeMode: (state, action: PayloadAction<Mode>) => {
			state.mode = action.payload;
		},
	},
});

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
	changeMode,
} = mindMapSlice.actions;
export const selectMindMap = (state: RootState) => state.mindmap;
export const selectMindMapNodes = (state: RootState) => state.mindmap.nodes;
export const selectMindMapChildAdjacencyList = (state: RootState) =>
	state.mindmap.childAdjacencyList;
export const selectMindMapActiveNodeIdx = (state: RootState) =>
	state.mindmap.activeNodeIdx;
export const selectMindMapActiveNode = (state: RootState) =>
	state.mindmap.nodes.find(
		(item) => item.idx === state.mindmap.activeNodeIdx
	);
export const selectMindMapConnectors = createSelector(
	[selectMindMapNodes, selectMindMapChildAdjacencyList],
	(nodes, childAdjacencyList) => {
		const indexToNodeMap = new Map<number, Node>();
		for (const node of nodes) {
			indexToNodeMap.set(node.idx, node);
		}
		const connectors: Connector[] = [];
		childAdjacencyList.forEach((list, fromNodeIdx) => {
			const fromNode = indexToNodeMap.get(fromNodeIdx);
			if (!fromNode)
				throw new Error("Something went wrong in selecting connectors");
			list.forEach((toNodeIdx) => {
				const toNode = indexToNodeMap.get(toNodeIdx);
				if (!toNode)
					throw new Error(
						"Something went wrong in selecting connectors"
					);
				connectors.push({
					id: fromNode.idx + "-" + toNode.idx,
					fromPosition: fromNode?.meta.position,
					toPosition: toNode?.meta.position,
				});
			});
		});
		return connectors;
	}
);
export const selectMode = (state: RootState) => state.mindmap.mode;
export const mindmapReducer = mindMapSlice.reducer;
