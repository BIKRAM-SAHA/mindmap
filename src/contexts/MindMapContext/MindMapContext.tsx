import { centerX, centerY } from "@modules/graphics/common/index.constants";
import { AbsolutePoint } from "@modules/graphics/common/index.types";
import { createContext, PropsWithChildren, useMemo, useState } from "react";

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
    position: AbsolutePoint;
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
    activeNodeId: string;
    changeActiveNodeId: (newNodeId: string) => void;
    onTextChange: (currNodeId: string, value: string) => void;
    addChild: (currNodeId: string) => void;
    removeNode: (currNodeId: string) => void;
    addSibling: (currNodeId: string) => void;
    moveNode: (currNodeId: string, endPosition: AbsolutePoint) => void;
};

const MindMapContext = createContext<MindMap | null>(null);

export const MindMapProvider = ({ children }: PropsWithChildren) => {
    const [nodes, setNodes] = useState<MindMap["nodes"]>([
        {
            id: self.crypto.randomUUID(),
            type: "root",
            content: "Root",
            position: { x: centerX, y: centerY },
            parent: null,
        },
    ]);
    const [connectors, setConnectors] = useState<MindMap["connectors"]>([]);
    const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0].id);

    const changeActiveNodeId = (newNodeId: string) => {
        console.log("nodeid changed: ", newNodeId);
        setActiveNodeId(newNodeId);
    };

    const onTextChange = (currNodeId: string, value: string) => {
        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === currNodeId
        );
        if (!currentNode)
            throw new Error("MindMapContext: Invalid active node");

        setNodes((prevNodes) =>
            prevNodes.map((item) => {
                if (item.id === currNodeId) return { ...item, content: value };
                return item;
            })
        );
    };

    const addChild = (currNodeId: string) => {
        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === currNodeId
        );
        if (!currentNode)
            throw new Error("MindMapContext: Invalid active node");

        const newNodeId = self.crypto.randomUUID();
        const newNodePosition: AbsolutePoint = {
            x: currentNode.position.x,
            y: currentNode.position.y,
        };
        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: newNodeId,
                type: "node",
                content: "",
                position: newNodePosition,
                parent: currNodeId,
            },
        ]);
        setConnectors((prevConnectors) => [
            ...prevConnectors,
            {
                id: `${currNodeId}-${newNodeId}`,
                fromNodeId: currNodeId,
                toNodeId: newNodeId,
                fromPosition: currentNode.position,
                toPosition: newNodePosition,
            },
        ]);
    };

    const addSibling = (currNodeId: string) => {
        const currentNode: Node | undefined = nodes.find(
            (item) => item.id === currNodeId
        );
        if (!currentNode)
            throw new Error("MindMapContext: Invalid active node");
        if (!currentNode.parent)
            throw new Error("Cannot add sibling of root node");
        addChild(currentNode.parent);
    };

    const removeNode = (currNodeId: string) => {
        setNodes((prevNodes) =>
            prevNodes.filter(
                (item) => item.id !== currNodeId && item.parent !== currNodeId
            )
        );
        setConnectors((prevConnectors) =>
            prevConnectors.filter(
                (item) =>
                    item.fromNodeId !== currNodeId &&
                    item.toNodeId !== currNodeId
            )
        );
    };

    const moveNode = (currNodeId: string, endPosition: AbsolutePoint) => {
        setNodes((prevNodes) =>
            prevNodes.map((item) => {
                if (item.id === currNodeId) item.position = endPosition;
                return item;
            })
        );
        setConnectors((prevConnectors) =>
            prevConnectors.map((item) => {
                if (item.fromNodeId === currNodeId)
                    item.fromPosition = endPosition;
                else if (item.toNodeId === currNodeId)
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
