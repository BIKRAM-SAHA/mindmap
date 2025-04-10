import { useContext, useEffect } from "react";
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
        addChild,
        addSibling,
        removeNode,
        moveNode,
    } = useContext(MindMapContext) ?? {};

    if (
        activeNodeId === undefined ||
        !nodes ||
        !connectors ||
        !addChild ||
        !addSibling ||
        !removeNode ||
        !moveNode
    )
        throw new Error("MindMapContext not initiated properly");

    const handleAddChildNode = () => {
        const result = addChild(activeNodeId);
        if (!result.success) console.error(result.message);
    };

    const handleAddSiblingNode = () => {
        const result = addSibling();
        if (!result.success) console.error(result.message);
    };
    const handleDeleteNode = () => {
        removeNode();
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
        window.scrollTo(
            centerX - window.innerWidth / 2,
            centerY - window.innerHeight / 2
        );
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Enter":
                    if (e.shiftKey) handleAddSiblingNode();
                    else if (e.ctrlKey) handleAddChildNode();
                    break;
                case "Delete":
                    if (e.shiftKey) handleDeleteNode();
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeNodeId]);

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
                        }}
                        key={item.id}
                    />
                );
            })}
        </div>
    );
}

export default Canvas;
