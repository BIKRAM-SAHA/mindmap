export const commands = [
    {
        title: 'Zoom',
        keys: ['ctrl', 'wheel scroll'],
        subTitle: 'Press ctrl and scroll mouse wheel to zoom',
    },
    {
        title: 'Pan',
        keys: ['ctrl', 'drag'],
        subTitle: 'Press ctrl and drag on screen to pan',
    },
    {
        title: 'Select node',
        keys: ['click'],
        subTitle: 'Click on node to select it',
    },
    {
        title: 'Add child node',
        keys: ['ctrl', 'enter'],
        subTitle: 'With a node selected press ctrl + enter to add child node',
    },
    {
        title: 'Add sibling node',
        keys: ['shift', 'enter'],
        subTitle:
            'With a node selected press shift + enter to add sibling node',
    },
    {
        title: 'Delete node',
        keys: ['shift', 'delete'],
        subTitle: 'With a node selected press shift + delete to delete node',
    },
    {
        title: 'Go to child node',
        keys: ['j'],
        subTitle: 'With a node selected press `j` to go to child node',
    },
    {
        title: 'Go to parent node',
        keys: ['k'],
        subTitle: 'With a node selected press `k` to go to parent node',
    },
    {
        title: 'Traverse through sibling nodes',
        keys: ['l | h'],
        subTitle:
            'With a node selected press `l` or `h` to traverse through sibling nodes',
    },
]
