import styles from './Toolbar.module.css'
import { topMiddleMenuTools, topRightMenuTools } from './Toolbar.constants'
import { useAppSelector } from '@app/hooks'
import { selectMindMapActiveNodeIdx } from '@app/slices/MindMapSlice'

type Props = {}

function Toolbar({}: Props) {
    const mindmapActiveNodeIdx = useAppSelector(selectMindMapActiveNodeIdx)

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
