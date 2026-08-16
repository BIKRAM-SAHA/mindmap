import Info from './tools/Info/Info'
import NodeStyleBar from './tools/NodeStyleBar/NodeStyleBar'
import Pan from './tools/Pan/Pan'
import Zoom from './tools/Zoom/Zoom'

export const topRightMenuTools = [
    {
        title: 'Info',
        helperText: 'Help',
        component: Info,
        onClick: () => {},
    },
]

export const topMiddleMenuTools = [
    {
        title: 'Node Style Bar',
        helperText: 'Node Style Bar',
        component: NodeStyleBar,
        onClick: () => {},
    },
]

export const bottomRightMenuTools = [
    {
        title: 'Zoom',
        helperText: 'Zoom',
        component: Zoom,
        onClick: () => {},
    },
    {
        title: 'Pan and zoom',
        helperText: 'Pan and zoom',
        component: Pan,
        onClick: () => {},
    },
]
