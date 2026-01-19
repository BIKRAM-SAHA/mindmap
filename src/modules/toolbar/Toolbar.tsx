import styles from './Toolbar.module.css'
import { topMiddleMenuTools, topRightMenuTools } from './Toolbar.constants'
import { useAppSelector } from '@app/hooks'
import { selectMindMapActiveNodeId } from '@app/slices/MindMapSlice'

function Toolbar() {
    const mindmapActiveNodeIdx = useAppSelector(selectMindMapActiveNodeId)

    return (
        <>
            <div className={[styles.topRightMenu, styles.menu].join(' ')}>
                {topRightMenuTools.map((item, index) => (
                    <div key={index} className={styles.menuItem}>
                        <item.component />
                    </div>
                ))}
            </div>
            {mindmapActiveNodeIdx !== null && (
                <div className={[styles.topMiddleMenu, styles.menu].join(' ')}>
                    {topMiddleMenuTools.map((item, index) => (
                        <div key={index} className={styles.menuItem}>
                            <item.component />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Toolbar
