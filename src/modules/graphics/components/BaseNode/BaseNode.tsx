import { useContext, useEffect, useRef, useState } from "react";
import { BaseNodeElemProps as Props } from "./BaseNode.types";
import styles from "./BaseNode.module.css";
import MindMapContext from "@contexts/MindMapContext";

function BaseNode({ type, NodeData }: Props) {
    const { activeNodeId, changeActiveNodeId, onTextChange } =
        useContext(MindMapContext) ?? {};
    if (!changeActiveNodeId || !onTextChange)
        throw new Error("MindMapContext not initiated properly");

    const contentElemRef = useRef<HTMLTextAreaElement | null>(null);
    const [editEnabled, setEditEnabled] = useState(false);
    const changeContentEditState = (value: boolean) => {
        setEditEnabled(value);
    };

    const { y: ypos, x: xpos } = NodeData.position;

    const adjustHeight = (el: HTMLTextAreaElement) => {
        el.style.height = el.scrollHeight + "px";
    };

    useEffect(() => {
        if (editEnabled === true) {
            contentElemRef?.current?.focus();
            contentElemRef?.current?.setSelectionRange(
                contentElemRef?.current?.value.length,
                contentElemRef?.current?.value.length
            );
        }
    }, [editEnabled]);

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
            onClick={() => {
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
                    onTextChange(
                        e.target.value,
                        e.target.getBoundingClientRect().height,
                        e.target.getBoundingClientRect().width
                    );
                    adjustHeight(e.target);
                }}
                ref={contentElemRef}
                readOnly={!editEnabled}
            />
        </div>
    );
}

export default BaseNode;
