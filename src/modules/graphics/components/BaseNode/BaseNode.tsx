import { useEffect, useRef } from 'react'
import { BaseNodeElemProps as Props } from './BaseNode.types'
import styles from './BaseNode.module.css'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    changeActiveNode,
    onTextChange,
    removeNode,
    selectMindMapActiveNodeId,
} from '@app/slices/MindMapSlice'
import { changeKeyboardMode, selectKeyboardMode } from '@app/slices/ModeSlice'

function BaseNode({ NodeData }: Props) {
    const mindmapActiveNodeId = useAppSelector(selectMindMapActiveNodeId)
    const keyboardMode = useAppSelector(selectKeyboardMode)
    const dispatch = useAppDispatch()

    const editEnabled =
        keyboardMode.type === 'insert' &&
        keyboardMode.nodeIdBeingEdited === NodeData.id

    const contentElemRef = useRef<HTMLTextAreaElement | null>(null)

    const changeContentEditState = (value: boolean) => {
        if (value)
            dispatch(
                changeKeyboardMode({
                    type: 'insert',
                    nodeIdBeingEdited: NodeData.id,
                })
            )
        else
            dispatch(
                changeKeyboardMode({
                    type: 'normal',
                })
            )
    }

    const { y: ypos, x: xpos } = NodeData.position

    useEffect(() => {
        if (editEnabled === true) {
            contentElemRef?.current?.focus()
            contentElemRef?.current?.setSelectionRange(
                contentElemRef?.current?.value.length,
                contentElemRef?.current?.value.length
            )
        }
    }, [editEnabled])
    useEffect(() => {
        //remove node if it's empty
        if (
            !NodeData.text.trim().length &&
            mindmapActiveNodeId !== NodeData.id
        ) {
            dispatch(removeNode(NodeData.id))
        }
    }, [mindmapActiveNodeId, NodeData.text, NodeData.id, dispatch])
    return (
        <div
            draggable
            onDragStart={(e) => {
                dispatch(changeActiveNode(NodeData.id))
                e.dataTransfer.dropEffect = 'move'
            }}
            data-isactive={mindmapActiveNodeId === NodeData.id}
            className={styles.baseNode}
            onClick={(e) => {
                e.stopPropagation()
                dispatch(changeActiveNode(NodeData.id))
            }}
            onDoubleClick={() => {
                changeContentEditState(true)
            }}
            onBlur={() => {
                changeContentEditState(false)
            }}
            style={{
                transform: `translate(${xpos}px, ${ypos}px) translate(-50%,-50%)`,
                backgroundColor: NodeData.fillColor,
                borderColor: NodeData.lineColor,
                borderWidth: NodeData.lineWidth,
            }}
        >
            <textarea
                value={NodeData.text}
                onChange={(e) => {
                    dispatch(onTextChange(e.target.value))
                }}
                ref={contentElemRef}
                readOnly={!editEnabled}
                className={styles.textArea}
                style={{ color: NodeData.textColor }}
            />
        </div>
    )
}

export default BaseNode
