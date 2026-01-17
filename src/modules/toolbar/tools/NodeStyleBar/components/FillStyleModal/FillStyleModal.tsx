import { useState } from 'react'
import nodeStyleBarCommonStyles from '../common/style.module.css'
import { DEFAULT_FILL_COLOR } from '../common/constants'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    onFillColorChange,
    selectMindMapActiveNode,
} from '@app/slices/MindMapSlice'
import { changeSelectedButton } from '@app/slices/NodeStylebarSlice'

type Props = {}

function FillStyleModal({}: Props) {
    const activeNode = useAppSelector(selectMindMapActiveNode)
    const dispatch = useAppDispatch()

    const [color, setColor] = useState<string>(
        activeNode?.meta.fillColor || DEFAULT_FILL_COLOR
    )

    const handleSave = () => {
        dispatch(onFillColorChange(color))
        dispatch(changeSelectedButton(null))
    }
    const handleCancel = () => {
        dispatch(changeSelectedButton(null))
    }

    return (
        <div className={nodeStyleBarCommonStyles.container}>
            <h1>Fill Styles</h1>
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
            <div className={nodeStyleBarCommonStyles.btnsContianer}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default FillStyleModal
