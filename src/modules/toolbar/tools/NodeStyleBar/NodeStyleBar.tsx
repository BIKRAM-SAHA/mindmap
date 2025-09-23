import { MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./NodeStyle.module.css";
import FillStyleModal from "./components/FillStyleModal/FillStyleModal";
import BorderStyleModal from "./components/BorderStyleModal/BorderStyleModal";
import TextStyleModal from "./components/TextStyleModal/TextStyleModal";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
	BUTTON_TYPE,
	changeSelectedButton,
	selectNodeStylebar,
} from "@app/slices/NodeStylebarSlice";

type Props = {};

function NodeStyleBar({}: Props) {
	const nodeStylebarState = useAppSelector(selectNodeStylebar);
	const dispatch = useAppDispatch();

	const handleBtnClick = (e: MouseEvent, type: BUTTON_TYPE) => {
		e.preventDefault();
		dispatch(changeSelectedButton(type));
	};

	return (
		<div className={styles.container}>
			<a
				title="Fill Color"
				className={[styles.icon, styles.fillIcon].join(" ")}
				onClick={(e) => handleBtnClick(e, BUTTON_TYPE.FILL_ICON)}
			></a>
			<a
				title="Line Color"
				className={[styles.icon, styles.lineColorIcon].join(" ")}
				onClick={(e) => handleBtnClick(e, BUTTON_TYPE.LINE_ICON)}
			></a>
			<a
				title="Text Color"
				className={[styles.icon, styles.textColorIcon].join(" ")}
				onClick={(e) => handleBtnClick(e, BUTTON_TYPE.TEXT_ICON)}
			></a>
			{nodeStylebarState.selectedButton &&
				createPortal(
					<div className={styles.portalContainer}>
						{(() => {
							switch (nodeStylebarState.selectedButton) {
								case BUTTON_TYPE.FILL_ICON:
									return <FillStyleModal />;
								case BUTTON_TYPE.LINE_ICON:
									return <BorderStyleModal />;
								case BUTTON_TYPE.TEXT_ICON:
									return <TextStyleModal />;
							}
						})()}
					</div>,
					document.body
				)}
		</div>
	);
}

export default NodeStyleBar;
