import { useAppDispatch, useAppSelector } from '@app/hooks'
import { changeMouseMode, selectMouseMode } from '@app/slices/ModeSlice'

function Pan() {
    const mouseMode = useAppSelector(selectMouseMode)
    const dispath = useAppDispatch()

    const buttons = [
        {
            value: 'SELECT',
            label: 'Select',
            onClick: () => {
                dispath(changeMouseMode('SELECT'))
            },
        },
        {
            value: 'PAN',
            label: 'Pan',
            onClick: () => {
                dispath(changeMouseMode('PAN'))
            },
        },
    ]

    return (
        <div>
            {buttons.map((item) => (
                <span key={item.value}>
                    <input
                        type="radio"
                        id={item.value}
                        name="mouseMode"
                        value={item.value}
                        checked={mouseMode === item.value}
                        onChange={item.onClick}
                    />
                    <label htmlFor={item.value}>{item.label}</label>
                </span>
            ))}
        </div>
    )
}

export default Pan
