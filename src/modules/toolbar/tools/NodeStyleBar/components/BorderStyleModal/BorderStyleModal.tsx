import { useState } from 'react'
import nodeStyleBarCommonStyles from '../common/style.module.css'
import { DEFAULT_BORDER_COLOR, DEFAULT_BORDER_WIDTH } from '../common/constants'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    onLineColorChange,
    onLineWidthChange,
    selectMindMapActiveNode,
} from '@app/slices/MindMapSlice'
import { changeSelectedButton } from '@app/slices/NodeStylebarSlice'

function BorderStyleModal() {
    const activeNode = useAppSelector(selectMindMapActiveNode)
    const dispatch = useAppDispatch()

    const [color, setColor] = useState<string>(
        activeNode?.meta.lineColor || DEFAULT_BORDER_COLOR
    )
    const [width, setWidth] = useState<string>(
        `${activeNode?.meta.lineWidth}` || DEFAULT_BORDER_WIDTH
    )

    const handleSave = () => {
        dispatch(onLineColorChange(color))
        dispatch(
            onLineWidthChange(
                parseInt(width.length ? width : DEFAULT_BORDER_WIDTH)
            )
        )
        dispatch(changeSelectedButton(null))
    }
    const handleCancel = () => {
        dispatch(changeSelectedButton(null))
    }

    return (
        <div className={nodeStyleBarCommonStyles.container}>
            <h1>Border Styles</h1>
            <div>
                <label>Color</label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                        setColor(e.target.value)
                    }}
                />
            </div>
            <div>
                <label>Width</label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => {
                        setWidth(e.target.value)
                    }}
                />
            </div>
            <div className={nodeStyleBarCommonStyles.btnsContianer}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default BorderStyleModal
