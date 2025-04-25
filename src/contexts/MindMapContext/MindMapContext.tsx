import { Response } from "@modules/common/index.types";
import { centerX, centerY } from "@modules/graphics/common/index.constants";
import { AbsolutePoint } from "@modules/graphics/common/index.types";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./MindMap.constants";
import { v4 as uuidv4 } from "uuid";

interface RootNode {
    type: "root";
    parent: null;
}
interface SimpleNode {
    type: "node";
    parent: string;
}
type Node = (RootNode | SimpleNode) & {
    id: string;
    content: string;
    meta: {
        position: AbsolutePoint;
        height: number;
        width: number;
    };
};

type Connector = {
    id: string;
    fromNodeId: string;
    toNodeId: string;
    fromPosition: AbsolutePoint;
    toPosition: AbsolutePoint;
};
export type MindMap = {
    nodes: Node[];
    connectors: Connector[];
    activeNodeId: string | null;
    changeActiveNodeId: (newNodeId: string | null) => void;
    onTextChange: (value: string, height: number, width: number) => void;
    addChild: (currNodeId: string | null) => Response<string>;
    removeNode: (nodeId: string) => Response<string>;
    addSibling: () => Response<string>;
    moveNode: (endPosition: AbsolutePoint) => void;
};

const MindMapContext = createContext<MindMap | null>(null);

export const MindMapProvider = ({ children }: PropsWithChildren) => {
    const [nodes, setNodes] = useState<MindMap["nodes"]>([
        {
            id: uuidv4(),
            type: "root",
            content: "Root",
            meta: {
                position: { x: centerX, y: centerY },
                height: DEFAULT_NODE_HEIGHT,
                width: DEFAULT_NODE_WIDTH,
            },
            parent: null,
        },
    ]);
    const [connectors, setConnectors] = useState<MindMap["connectors"]>([]);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

    const changeActiveNodeId = (newNodeId: string | null) => {
        setActiveNodeId(newNodeId);
    };

    const onTextChange = (value: string, height: number, width: number) => {
        console.log(height);
        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === activeNodeId
        );
        if (!currentNode)
            throw new Error("MindMapContext: Invalid active node");
        setNodes((prevNodes) =>
            prevNodes.map((item) => {
                if (item.id === activeNodeId)
                    return {
                        ...item,
                        content: value,
                        meta: {
                            ...item.meta,
                            height:
                                height > DEFAULT_NODE_HEIGHT
                                    ? height
                                    : DEFAULT_NODE_HEIGHT,
                            width:
                                width > DEFAULT_NODE_WIDTH
                                    ? width
                                    : DEFAULT_NODE_WIDTH,
                        },
                    };
                return item;
            })
        );
    };

    const addChild = (currNodeId: string | null): Response<string> => {
        if (!currNodeId) {
            console.error("No NodeId selected");
            return {
                success: false,
                message: "No node selected",
            };
        }

        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === currNodeId
        );
        if (!currentNode) {
            console.error("Invalid NodeId selected");
            return {
                success: false,
                message: "Something went wrong try again",
            };
        }
        if (!currentNode.content.length) {
            console.error("Cannot add child of an empty node");
            return {
                success: false,
                message: "Cannot add child of an empty node",
            };
        }

        const newNodeId = self.crypto.randomUUID();
        const newNodePosition: AbsolutePoint = {
            x: currentNode.meta.position.x + currentNode.meta.width,
            y: currentNode.meta.position.y + currentNode.meta.height,
        };
        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: newNodeId,
                type: "node",
                content: "",
                meta: {
                    position: newNodePosition,
                    height: DEFAULT_NODE_HEIGHT,
                    width: DEFAULT_NODE_WIDTH,
                },
                parent: currNodeId,
            },
        ]);
        setConnectors((prevConnectors) => [
            ...prevConnectors,
            {
                id: `${currNodeId}-${newNodeId}`,
                fromNodeId: currNodeId,
                toNodeId: newNodeId,
                fromPosition: currentNode.meta.position,
                toPosition: newNodePosition,
            },
        ]);
        return {
            success: true,
            data: newNodeId,
        };
    };

    const addSibling = (): Response<string> => {
        if (!activeNodeId) {
            console.error("No NodeId selected");
            return {
                success: false,
                message: "No node selected",
            };
        }

        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === activeNodeId
        );
        if (!currentNode) {
            console.error("Invalid active node");
            return {
                success: false,
                message: "Something went wrong try again",
            };
        }
        if (!currentNode.parent) {
            console.error("Cannot add sibling of root node");
            return {
                success: false,
                message: "Cannot add sibling of root",
            };
        }
        if (!currentNode.content.length) {
            console.error("Cannot add sibling of an empty node");
            return {
                success: false,
                message: "Cannot add sibling of an empty node",
            };
        }

        return addChild(currentNode.parent);
    };

    const removeNode = (nodeId: string): Response<string> => {
        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === nodeId
        );
        if (!currentNode) {
            console.error("Invalid active node");
            return {
                success: false,
                message: "Something went wrong try again",
            };
        }
        if (!currentNode.parent) {
            console.error("Cannot delete root node");
            return {
                success: false,
                message: "Cannot delete root node",
            };
        }

        setNodes((prevNodes) =>
            prevNodes.filter(
                (item) => item.id !== nodeId && item.parent !== nodeId
            )
        );
        setConnectors((prevConnectors) =>
            prevConnectors.filter(
                (item) => item.fromNodeId !== nodeId && item.toNodeId !== nodeId
            )
        );
        return {
            success: true,
            data: "Successfully deleted node",
        };
    };

    const moveNode = (endPosition: AbsolutePoint) => {
        setNodes((prevNodes) =>
            prevNodes.map((item) => {
                if (item.id === activeNodeId) item.meta.position = endPosition;
                return item;
            })
        );
        setConnectors((prevConnectors) =>
            prevConnectors.map((item) => {
                if (item.fromNodeId === activeNodeId)
                    item.fromPosition = endPosition;
                else if (item.toNodeId === activeNodeId)
                    item.toPosition = endPosition;
                return item;
            })
        );
    };

    const contextValues = useMemo(
        () => ({
            nodes,
            connectors,
            activeNodeId,
            changeActiveNodeId,
            onTextChange,
            addChild,
            addSibling,
            removeNode,
            moveNode,
        }),
        [
            nodes,
            connectors,
            activeNodeId,
            changeActiveNodeId,
            onTextChange,
            addChild,
            addSibling,
            removeNode,
            moveNode,
        ]
    );

    return (
        <MindMapContext.Provider value={contextValues}>
            {children}
        </MindMapContext.Provider>
    );
};

export default MindMapContext;
