import styles from "./Toolbar.module.css";
import { topMiddleMenuTools, topRightMenuTools } from "./Toolbar.constants";
import { useAppSelector } from "@app/hooks";
import { selectMindMapActiveNodeId } from "@app/slices/MindMapSlice";

type Props = {};

function Toolbar({}: Props) {
	const mindmapActiveNodeId = useAppSelector(selectMindMapActiveNodeId);

	return (
		<>
			<div className={[styles.topRightMenu, styles.menu].join(" ")}>
				{topRightMenuTools.map((item, index) => (
					<div key={index} className={styles.menuItem}>
						<item.component />
					</div>
				))}
			</div>
			{mindmapActiveNodeId && (
				<div className={[styles.topMiddleMenu, styles.menu].join(" ")}>
					{topMiddleMenuTools.map((item, index) => (
						<div key={index} className={styles.menuItem}>
							<item.component />
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Toolbar;
