import { useContext, useEffect, useRef, useState } from "react";
import { BaseNodeElemProps as Props } from "./BaseNode.types";
import styles from "./BaseNode.module.css";
import MindMapContext from "@contexts/MindMapContext";
import { notifyError } from "@modules/notifications";

function BaseNode({ type, NodeData }: Props) {
    const { activeNodeId, changeActiveNodeId, onTextChange, removeNode } =
        useContext(MindMapContext) ?? {};
    if (!changeActiveNodeId || !onTextChange || !removeNode)
        throw new Error("MindMapContext not initiated properly");

    const contentElemRef = useRef<HTMLTextAreaElement | null>(null);
    const [editEnabled, setEditEnabled] = useState(
        activeNodeId === NodeData.id
    );
    const changeContentEditState = (value: boolean) => {
        setEditEnabled(value);
    };
    const removeNodeIfEmpty = () => {
        if (
            type != "root" &&
            !NodeData.text.length &&
            activeNodeId !== NodeData.id
        ) {
            const result = removeNode(NodeData.id);
            if (!result.success) notifyError(result.message);
        }
    };

    const { y: ypos, x: xpos } = NodeData.position;

    useEffect(() => {
        if (editEnabled === true) {
            contentElemRef?.current?.focus();
            contentElemRef?.current?.setSelectionRange(
                contentElemRef?.current?.value.length,
                contentElemRef?.current?.value.length
            );
        }
    }, [editEnabled]);
    useEffect(() => {
        if (contentElemRef.current !== null) {
            contentElemRef.current.style.height = NodeData.height + "px";
            contentElemRef.current.style.width = NodeData.width + "px";
        }
    }, []);
    useEffect(() => {
        removeNodeIfEmpty();
    }, [activeNodeId]);
    return (
        <div
            draggable
            onDragStart={(e) => {
                changeActiveNodeId(NodeData.id);
                e.dataTransfer.dropEffect = "move";
            }}
            data-isactive={activeNodeId === NodeData.id}
            className={[
                styles.baseNode,
                type === "node" ? `${styles.node}` : `${styles.rootNode}`,
            ].join(" ")}
            onClick={(e) => {
                e.stopPropagation();
                changeActiveNodeId(NodeData.id);
            }}
            onDoubleClick={() => {
                changeContentEditState(true);
            }}
            onBlur={() => {
                changeContentEditState(false);
            }}
            style={{
                position: "absolute",
                transform: `translate(${xpos}px, ${ypos}px) translate(-50%,-50%)`,
            }}
        >
            <textarea
                value={NodeData.text}
                onChange={(e) => {
                    e.target.style.height = "auto";
                    const scollHeight = e.target.scrollHeight;
                    e.target.style.width = "auto";
                    const scollWidth = e.target.scrollWidth;
                    const newHeight =
                        scollHeight > NodeData.height
                            ? scollHeight
                            : NodeData.height;
                    const newWidth =
                        scollWidth > NodeData.width
                            ? scollWidth
                            : NodeData.width;
                    e.target.style.height = newHeight + "px";
                    e.target.style.width = newWidth + "px";
                    onTextChange(e.target.value, newHeight, newWidth);
                }}
                ref={contentElemRef}
                readOnly={!editEnabled}
                className={styles.textArea}
                rows={1}
                cols={1}
            />
        </div>
    );
}

export default BaseNode;
