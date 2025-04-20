import { Canvas } from "@modules/graphics";
import { HomeScreenProps as Props } from "./Home.types";
import Toolbar from "@modules/toolbar";

function Home({}: Props) {
    return (
        <>
            <Canvas />
            <Toolbar />
        </>
    );
}

export default Home;
