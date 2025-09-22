import { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
	addChild,
	addSibling,
	changeActiveNode,
	onMoveNode,
	removeNode,
	selectMindMapConnectors,
	selectMindMapNodes,
} from "@app/slices/MindMapSlice";

function Canvas({}: Props) {
	const dispatch = useAppDispatch();
	const mindmapNodes = useAppSelector(selectMindMapNodes);
	const mindmapConnectors = useAppSelector(selectMindMapConnectors);

	const handleAddChildNode = () => {
		dispatch(addChild());
	};

	const handleAddSiblingNode = () => {
		dispatch(addSibling());
	};
	const handleDeleteNode = () => {
		dispatch(removeNode());
	};
	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		dispatch(
			onMoveNode({
				x: e.pageX,
				y: e.pageY,
			})
		);
	};
	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		dispatch(changeActiveNode(null));
	};

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
			onKeyDown={handleKeyDown}
			onClick={handleClick}
		>
			<svg
				style={{
					position: "absolute",
					width: `${canvasWidth}px`,
					height: `${canvasHeight}px`,
				}}
			>
				{mindmapConnectors.map((item) => (
					<Path
						from={item.fromPosition}
						to={item.toPosition}
						key={item.id}
					/>
				))}
			</svg>
			{mindmapNodes.map((item) => {
				return (
					<BaseNode
						NodeData={{
							id: item.idx,
							text: item.content,
							position: {
								x: item.meta.position.x,
								y: item.meta.position.y,
							},
							fillColor: item.meta.fillColor,
							lineColor: item.meta.lineColor,
							lineWidth: item.meta.lineWidth,
							textColor: item.meta.textColor,
						}}
						key={item.idx}
					/>
				);
			})}
		</div>
	);
}

export default Canvas;
