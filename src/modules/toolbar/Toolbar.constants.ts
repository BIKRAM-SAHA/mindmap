import Info from "./tools/Info/Info";
import ZoomBar from "./tools/zoombar/ZoomBar";

export const topRightMenuTools = [
    {
        title: "Info",
        helperText: "Help",
        component: Info,
        onClick: () => {},
    },
];

export const bottomRightMenuTools = [
    {
        title: "Zoom",
        helperText: "Zoom",
        component: ZoomBar,
        onClick: () => {},
    },
];
