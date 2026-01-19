import { AbsolutePoint } from '@modules/graphics/common/index.types'

export type BaseNodeElemProps = {
    NodeData: {
        id: string
        text: string
        position: AbsolutePoint
        fillColor: string
        lineColor: string
        lineWidth: number
        textColor: string
    }
}
