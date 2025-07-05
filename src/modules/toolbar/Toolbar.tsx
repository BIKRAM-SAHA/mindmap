import styles from "./Toolbar.module.css";
import { bottomRightMenuTools, topRightMenuTools } from "./Toolbar.constants";

type Props = {};

function Toolbar({}: Props) {
    return (
        <>
            <div className={[styles.topRightMenu, styles.menu].join(" ")}>
                {topRightMenuTools.map((item, index) => (
                    <div key={index} className={styles.menuItem}>
                        <item.component />
                    </div>
                ))}
            </div>
            <div className={[styles.bottomRightMenu, styles.menu].join(" ")}>
                {bottomRightMenuTools.map((item, index) => (
                    <div key={index} className={styles.menuItem}>
                        <item.component />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Toolbar;
