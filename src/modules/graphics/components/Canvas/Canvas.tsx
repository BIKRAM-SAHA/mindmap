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
        !activeNodeId ||
        !nodes ||
        !connectors ||
        !addChild ||
        !addSibling ||
        !removeNode ||
        !moveNode
    )
        throw new Error("MindMapContext not initiated properly");

    const handleAddChildNode = () => {
        console.log("activeNode from method: ", activeNodeId);
        addChild(activeNodeId);
    };

    const handleAddSiblingNode = () => {
        addSibling(activeNodeId);
    };
    const handleDeleteNode = () => {
        removeNode(activeNodeId);
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        moveNode(activeNodeId, {
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
                    else handleAddChildNode();
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
                                x: item.position.x,
                                y: item.position.y,
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
