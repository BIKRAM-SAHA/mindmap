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
	goToChild,
	goToNextSibling,
	goToParent,
	goToPrevSibling,
	onMoveNode,
	removeNode,
	selectMindMapConnectors,
	selectMindMapNodes,
	selectMode,
} from "@app/slices/MindMapSlice";

function Canvas({}: Props) {
	const dispatch = useAppDispatch();
	const mindmapNodes = useAppSelector(selectMindMapNodes);
	const mindmapConnectors = useAppSelector(selectMindMapConnectors);
	const mode = useAppSelector(selectMode);

	const handleAddChildNode = () => {
		dispatch(addChild());
	};

	const handleAddSiblingNode = () => {
		dispatch(addSibling());
	};
	const handleDeleteNode = () => {
		dispatch(removeNode());
	};
	const handleGoToChildNode = () => {
		dispatch(goToChild());
	};
	const handleGoToParentNode = () => {
		dispatch(goToParent());
	};
	const handleGoToNextSiblingNode = () => {
		dispatch(goToNextSibling());
	};
	const handleGoToPrevSiblingNode = () => {
		dispatch(goToPrevSibling());
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

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		dispatch(changeActiveNode(null));
	};

	useEffect(() => {
		//handle scrollToCenter onLoad
		window.scrollTo(
			centerX - window.innerWidth / 2,
			centerY - window.innerHeight / 2
		);
	}, []);
	useEffect(() => {
		//handle keybindings for mindmap
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "Escape":
					break;
				case "Enter":
					if (e.shiftKey) handleAddSiblingNode();
					else if (e.ctrlKey) handleAddChildNode();
					break;
				case "Delete":
					e.preventDefault();
					if (e.shiftKey) handleDeleteNode();
					break;
				case "j":
					if (mode.type === "normal") {
						e.preventDefault();
						handleGoToChildNode();
					}
					break;
				case "k":
					if (mode.type === "normal") {
						e.preventDefault();
						handleGoToParentNode();
					}
					break;
				case "l":
					if (mode.type === "normal") {
						e.preventDefault();
						handleGoToNextSiblingNode();
					}
					break;
				case "h":
					if (mode.type === "normal") {
						e.preventDefault();
						handleGoToPrevSiblingNode();
						break;
					}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [mode]);

	return (
		<div
			className={styles.canvasRoot}
			onDrop={onDrop}
			onDragOver={onDragOver}
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
							id: item.id,
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
						key={item.id}
					/>
				);
			})}
		</div>
	);
}

export default Canvas;
