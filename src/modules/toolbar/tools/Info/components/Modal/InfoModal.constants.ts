export const commands = [
    {
        title: "Select node",
        keys: ["click"],
        subTitle: "Click on node to select it",
    },
    {
        title: "Add child node",
        keys: ["click", "ctrl", "enter"],
        subTitle: "Click on node then ctrl + enter to add child node",
    },
    {
        title: "Add sibling node",
        keys: ["click", "shift", "enter"],
        subTitle: "Click on node then shift + enter to add sibling node",
    },
    {
        title: "Delete node",
        keys: ["click", "shift", "delete"],
        subTitle: "Click on node then shift + delete to delete node",
    },
    {
        title: "Go to child node",
        keys: ["click", "j"],
        subTitle: "Select a node then `j` to go to child node",
    },
    {
        title: "Go to parent node",
        keys: ["click", "k"],
        subTitle: "Select a node then `k` to go to parent node",
    },
    {
        title: "Traverse through sibling nodes",
        keys: ["click", "l | k"],
        subTitle: "Select a node then `l` or `k` to traverse through sibling nodes",
    }
];
