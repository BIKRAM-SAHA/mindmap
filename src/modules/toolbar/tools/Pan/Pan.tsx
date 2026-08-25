import { useAppDispatch } from '@app/hooks'
import { changeMouseMode } from '@app/slices/ModeSlice'
import { useEffect, useState } from 'react'

type Options = 'SELECT' | 'PAN'
type Button = {
    value: Options
    label: string
    onClick: () => void
}

function Pan() {
    const [mouseMode, setMouseMode] = useState<Options>('SELECT')
    const dispatch = useAppDispatch()

    const buttons: Button[] = [
        {
            value: 'SELECT',
            label: 'Select',
            onClick: () => {
                setMouseMode('SELECT')
                dispatch(changeMouseMode('SELECT'))
            },
        },
        {
            value: 'PAN',
            label: 'Pan',
            onClick: () => {
                setMouseMode('PAN')
                dispatch(changeMouseMode('PAN'))
            },
        },
    ]

    useEffect(() => {
        //handle key events
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Control':
                    if (mouseMode !== 'SELECT') return
                    dispatch(changeMouseMode('PAN'))
                    break
            }
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Control':
                    if (mouseMode !== 'SELECT') return
                    dispatch(changeMouseMode('SELECT'))
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [mouseMode])

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
