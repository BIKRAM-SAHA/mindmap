import PanZoomContext from "@contexts/PanZoomContext";
import { useContext } from "react";

type Props = {};

function ZoomBar({}: Props) {
    const { zoomLevel, zoomIn, zoomOut } = useContext(PanZoomContext) ?? {};
    if (!zoomLevel || !zoomIn || !zoomOut)
        throw new Error("PanZoomContext not initiated properly");
    return (
        <div>
            <button onClick={zoomIn}>+</button>
            <span>{Math.floor(zoomLevel * 100)}%</span>
            <button onClick={zoomOut}>-</button>
        </div>
    );
}

export default ZoomBar;
