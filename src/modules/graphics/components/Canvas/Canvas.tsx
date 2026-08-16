import { useEffect, useRef } from 'react'
import Path from '../Path/Path'
import styles from './Canvas.module.css'
import BaseNode from '../BaseNode/BaseNode'
import {
    canvasHeight,
    canvasWidth,
} from '@modules/graphics/common/index.constants'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    addChild,
    addSibling,
    changeActiveNode,
    goToChild,
    goToNextSibling,
    goToParent,
    goToPrevSibling,
    onMoveNode,
    removeNode,
    selectMindMapActiveNodeId,
    selectMindMapConnectors,
    selectMindMapNodes,
} from '@app/slices/MindMapSlice'
import {
    changeKeyboardMode,
    selectKeyboardMode,
    selectMouseMode,
} from '@app/slices/ModeSlice'
import {
    endPan,
    pan,
    selectIsPanActive,
    selectPanX,
    selectPanY,
    selectScale,
    startPan,
} from '@app/slices/ViewportSlice'

function Canvas() {
    const dispatch = useAppDispatch()
    const activeNodeId = useAppSelector(selectMindMapActiveNodeId)
    const mindmapNodes = useAppSelector(selectMindMapNodes)
    const mindmapConnectors = useAppSelector(selectMindMapConnectors)
    const keyboardMode = useAppSelector(selectKeyboardMode)
    const mouseMode = useAppSelector(selectMouseMode)
    const panX = useAppSelector(selectPanX)
    const panY = useAppSelector(selectPanY)
    const isPanActive = useAppSelector(selectIsPanActive)
    const scale = useAppSelector(selectScale)
    const previousMouse = useRef({
        x: 0,
        y: 0,
    })

    const handleAddChildNode = () => {
        dispatch(addChild())
    }
    const handleAddSiblingNode = () => {
        dispatch(addSibling())
    }
    const handleDeleteNode = () => {
        dispatch(removeNode(activeNodeId))
    }
    const handleGoToChildNode = () => {
        dispatch(goToChild())
    }
    const handleGoToParentNode = () => {
        dispatch(goToParent())
    }
    const handleGoToNextSiblingNode = () => {
        dispatch(goToNextSibling())
    }
    const handleGoToPrevSiblingNode = () => {
        dispatch(goToPrevSibling())
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (mouseMode !== 'SELECT') return
        e.preventDefault()
        const { x: prevClientX, y: prevClientY } = JSON.parse(
            e.dataTransfer.getData('application/json')
        )
        const dx = e.clientX - prevClientX
        const dy = e.clientY - prevClientY
        dispatch(
            onMoveNode({
                dx,
                dy,
                zoom: scale / 100,
            })
        )
    }
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (mouseMode !== 'SELECT') return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (mouseMode !== 'SELECT') return
        e.dataTransfer.setData(
            'application/json',
            JSON.stringify({
                x: e.clientX,
                y: e.clientY,
            })
        )
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseMode !== 'SELECT') return
        e.preventDefault()
        dispatch(changeActiveNode(null))
    }

    useEffect(() => {
        //handle pan for mindmap
        const handleMouseDown = (e: MouseEvent) => {
            if (mouseMode !== 'PAN') return
            previousMouse.current = {
                x: e.clientX,
                y: e.clientY,
            }
            dispatch(startPan())
        }
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseMode !== 'PAN') return
            if (!isPanActive) return
            const dx = e.clientX - previousMouse.current.x
            const dy = e.clientY - previousMouse.current.y
            previousMouse.current = {
                x: e.clientX,
                y: e.clientY,
            }
            dispatch(pan({ dx, dy }))
        }
        const handleMouseUp = () => {
            if (mouseMode !== 'PAN') return
            if (!isPanActive) return
            previousMouse.current = {
                x: 0,
                y: 0,
            }
            dispatch(endPan())
        }
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [mouseMode, isPanActive, scale, dispatch])
    useEffect(() => {
        //handle keybindings for mindmap
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    if (keyboardMode.type === 'insert') {
                        dispatch(changeKeyboardMode({ type: 'normal' }))
                    }
                    break
                case 'Enter':
                    if (e.shiftKey) handleAddSiblingNode()
                    else if (e.ctrlKey) handleAddChildNode()
                    else if (
                        activeNodeId !== null &&
                        keyboardMode.type === 'normal'
                    ) {
                        e.preventDefault()
                        dispatch(
                            changeKeyboardMode({
                                type: 'insert',
                                nodeIdBeingEdited: activeNodeId,
                            })
                        )
                    }
                    break
                case 'Delete':
                    if (e.shiftKey) handleDeleteNode()
                    break
                case 'j':
                    if (keyboardMode.type === 'normal') {
                        handleGoToChildNode()
                    }
                    break
                case 'k':
                    if (keyboardMode.type === 'normal') {
                        handleGoToParentNode()
                    }
                    break
                case 'l':
                    if (keyboardMode.type === 'normal') {
                        handleGoToNextSiblingNode()
                    }
                    break
                case 'h':
                    if (keyboardMode.type === 'normal') {
                        handleGoToPrevSiblingNode()
                        break
                    }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [keyboardMode, activeNodeId])

    return (
        <div
            className={styles.viewport}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={handleClick}
        >
            <div
                className={styles.world}
                style={{
                    transform: `
                        translate(${panX}px, ${panY}px)
                        scale(${scale / 100})
                    `,
                }}
            >
                <svg
                    style={{
                        position: 'absolute',
                        width: `${canvasWidth}px`,
                        height: `${canvasHeight}px`,
                    }}
                >
                    {mindmapConnectors.map((item) => (
                        <Path
                            from={item.fromPosition}
                            to={item.toPosition}
                            key={item.id}
                        />
                    ))}
                </svg>
                {mindmapNodes.map((item) => {
                    return (
                        <BaseNode
                            NodeData={{
                                id: item.id,
                                text: item.content,
                                position: {
                                    x: item.meta.position.x,
                                    y: item.meta.position.y,
                                },
                                fillColor: item.meta.fillColor,
                                lineColor: item.meta.lineColor,
                                lineWidth: item.meta.lineWidth,
                                textColor: item.meta.textColor,
                            }}
                            key={item.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Canvas
