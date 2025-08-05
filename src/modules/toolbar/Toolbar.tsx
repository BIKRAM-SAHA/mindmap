import styles from "./Toolbar.module.css";
import { topMiddleMenuTools, topRightMenuTools } from "./Toolbar.constants";
import { useContext } from "react";
import MindMapContext from "@contexts/MindMapContext";

type Props = {};

function Toolbar({ }: Props) {
    const { activeNodeId } = useContext(MindMapContext) ?? {};
    if (activeNodeId === undefined)
        throw new Error("MindMapContext not initiated properly");

    return (
        <>
            <div className={[styles.topRightMenu, styles.menu].join(" ")}>
                {topRightMenuTools.map((item, index) => (
                    <div key={index} className={styles.menuItem}>
                        <item.component />
                    </div>
                ))}
            </div>
            {
                activeNodeId && <div className={[styles.topMiddleMenu, styles.menu].join(" ")}>
                    {topMiddleMenuTools.map((item, index) => (
                        <div key={index} className={styles.menuItem}>
                            <item.component />
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default Toolbar;
