import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectScale, zoom } from '@app/slices/ViewportSlice'
import { ZOOM_STEP } from '@modules/common'

function Zoom() {
    const scale = useAppSelector(selectScale)
    const dispatch = useAppDispatch()

    const incrementByStep = () => {
        dispatch(
            zoom({
                scale: scale + ZOOM_STEP,
                mouseX: window.innerWidth / 2,
                mouseY: window.innerHeight / 2,
            })
        )
    }
    const decrementByStep = () => {
        dispatch(
            zoom({
                scale: scale - ZOOM_STEP,
                mouseX: window.innerWidth / 2,
                mouseY: window.innerHeight / 2,
            })
        )
    }

    return (
        <div>
            <button onClick={incrementByStep}>+</button>
            <span>{scale}%</span>
            <button onClick={decrementByStep}>-</button>
        </div>
    )
}

export default Zoom
