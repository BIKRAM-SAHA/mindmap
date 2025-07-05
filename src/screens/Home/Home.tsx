import { Canvas } from "@modules/graphics";
import { HomeScreenProps as Props } from "./Home.types";
import Toolbar from "@modules/toolbar";
import { PanZoomContextProvider } from "@contexts/PanZoomContext";
import { MindMapProvider } from "@contexts/MindMapContext";

function Home({ }: Props) {
    return (
        <>
            <PanZoomContextProvider>
                <MindMapProvider>
                    <Canvas />
                    <Toolbar />
                </MindMapProvider>
            </PanZoomContextProvider>
        </>
    );
}

export default Home;
