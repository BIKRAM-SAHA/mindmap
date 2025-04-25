import { useContext, useEffect } from "react";
import { notifyError } from "@modules/notifications";
import Path from "../Path/Path";
import styles from "./Canvas.module.css";
import BaseNode from "../BaseNode/BaseNode";
import { CanvasProps as Props } from "./Canvas.types";
import {
    canvasHeight,
    canvasWidth,
    centerX,
    centerY,
} from "@modules/graphics/common/index.constants";
import MindMapContext from "@contexts/MindMapContext";

function Canvas({}: Props) {
    const {
        activeNodeId,
        nodes,
        connectors,
        changeActiveNodeId,
        addChild,
        addSibling,
        removeNode,
        moveNode,
    } = useContext(MindMapContext) ?? {};

    if (
        activeNodeId === undefined ||
        !nodes ||
        !connectors ||
        !changeActiveNodeId ||
        !addChild ||
        !addSibling ||
        !removeNode ||
        !moveNode
    )
        throw new Error("MindMapContext not initiated properly");

    const handleAddChildNode = () => {
        const result = addChild(activeNodeId);
        if (!result.success) notifyError(result.message);
        else changeActiveNodeId(result.data);
    };

    const handleAddSiblingNode = () => {
        const result = addSibling();
        if (!result.success) notifyError(result.message);
        else changeActiveNodeId(result.data);
    };
    const handleDeleteNode = () => {
        if (!activeNodeId) {
            notifyError("Select a node to delete");
            return;
        }
        const result = removeNode(activeNodeId);
        if (!result.success) notifyError(result.message);
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        moveNode({
            x: e.pageX,
            y: e.pageY,
        });
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Enter":
                    e.preventDefault();
                    if (e.shiftKey) handleAddSiblingNode();
                    else if (e.ctrlKey) handleAddChildNode();
                    break;
                case "Delete":
                    e.preventDefault();
                    if (e.shiftKey) handleDeleteNode();
                    break;
            }
        };
        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            changeActiveNodeId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
        };
    }, [activeNodeId, nodes]);

    useEffect(() => {
        window.scrollTo(
            centerX - window.innerWidth / 2,
            centerY - window.innerHeight / 2
        );
    }, []);

    return (
        <div
            className={styles.canvasRoot}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <svg
                style={{
                    position: "absolute",
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`,
                }}
            >
                {connectors.map((item) => (
                    <Path
                        from={item.fromPosition}
                        to={item.toPosition}
                        key={item.id}
                    />
                ))}
            </svg>
            {nodes.map((item) => {
                return (
                    <BaseNode
                        type={item.type}
                        NodeData={{
                            id: item.id,
                            text: item.content,
                            position: {
                                x: item.meta.position.x,
                                y: item.meta.position.y,
                            },
                            height: item.meta.height,
                            width: item.meta.width,
                        }}
                        key={item.id}
                    />
                );
            })}
        </div>
    );
}

export default Canvas;
