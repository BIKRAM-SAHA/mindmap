import { useEffect, useRef, useState } from "react";
import { BaseNodeElemProps as Props } from "./BaseNode.types";
import styles from "./BaseNode.module.css";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
	changeActiveNode,
	changeMode,
	onTextChange,
	removeNode,
	selectMindMapActiveNodeIdx,
	selectMode,
} from "@app/slices/MindMapSlice";

function BaseNode({ NodeData }: Props) {
	const mindmapActivenodeIdx = useAppSelector(selectMindMapActiveNodeIdx);
	const mode = useAppSelector(selectMode);
	const dispatch = useAppDispatch();

	const editEnabled =
		mode.type === "insert" && mode.nodeIdxBeingEdited === NodeData.id;

	const contentElemRef = useRef<HTMLTextAreaElement | null>(null);

	const changeContentEditState = (value: boolean) => {
		if (value)
			dispatch(
				changeMode({
					type: "insert",
					nodeIdxBeingEdited: NodeData.id,
				})
			);
		else
			dispatch(
				changeMode({
					type: "normal",
				})
			);
	};
	const removeNodeIfEmpty = () => {
		if (!NodeData.text.length && mindmapActivenodeIdx !== NodeData.id) {
			dispatch(removeNode());
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
		removeNodeIfEmpty();
	}, [mindmapActivenodeIdx]);
	return (
		<div
			draggable
			onDragStart={(e) => {
				dispatch(changeActiveNode(NodeData.id));
				e.dataTransfer.dropEffect = "move";
			}}
			data-isactive={mindmapActivenodeIdx === NodeData.id}
			className={styles.baseNode}
			onClick={(e) => {
				e.stopPropagation();
				dispatch(changeActiveNode(NodeData.id));
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
				backgroundColor: NodeData.fillColor,
				borderColor: NodeData.lineColor,
				borderWidth: NodeData.lineWidth,
			}}
		>
			<textarea
				value={NodeData.text}
				onChange={(e) => {
					dispatch(onTextChange(e.target.value));
				}}
				ref={contentElemRef}
				readOnly={!editEnabled}
				className={styles.textArea}
				style={{ color: NodeData.textColor }}
			/>
		</div>
	);
}

export default BaseNode;
