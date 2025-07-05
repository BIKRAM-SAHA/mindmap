// import { canvasHeight, canvasWidth } from "@modules/graphics/common/index.constants";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type ZoomContextValue = {
    zoomLevel: number;
    zoomIn: () => void;
    zoomOut: () => void;
    worldToScreen: (worldX: number, worldY: number, offsetX: number, offsetY: number) => {
        screenX: number; screenY: number;
    };
    screenToWorld: (screenX: number, screenY: number, offsetX: number, offsetY: number) => {
        worldX: number; worldY: number;
    };
};

const PanZoomContext = createContext<ZoomContextValue | null>(null);
const ZOOM_DELTA = 0.1;
const MAX_ZOOM_LEVEL = 5;
const MIN_ZOOM_LEVEL = 1;
// const offsetX = -canvasHeight / 2;
// const offsetY = -canvasWidth / 2;

const worldToScreen = (worldX: number, worldY: number, offsetX: number, offsetY: number) => {
    const screenX = worldX - offsetX;
    const screenY = worldY - offsetY;
    return { screenX, screenY };
}
const screenToWorld = (screenX: number, screenY: number, offsetX: number, offsetY: number) => {
    const worldX = screenX + offsetX;
    const worldY = screenY + offsetY;
    return { worldX, worldY };
}

export const PanZoomContextProvider = ({ children }: PropsWithChildren) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    const zoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + ZOOM_DELTA, MAX_ZOOM_LEVEL));
    };

    const zoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - ZOOM_DELTA, MIN_ZOOM_LEVEL));
    };

    useEffect(() => {
        const panWorld = (e: MouseEvent) => {
            // e.
        }
        window.addEventListener('mousemove', panWorld);

        return window.removeEventListener('drag', panWorld);
    })

    return (
        <PanZoomContext.Provider value={{ zoomLevel, zoomIn, zoomOut, worldToScreen, screenToWorld }}>
            {children}
        </PanZoomContext.Provider>
    );
};

export default PanZoomContext;
