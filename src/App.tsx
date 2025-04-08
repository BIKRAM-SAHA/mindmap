import { MindMapProvider } from "@contexts/MindMapContext";
import "./App.css";
import { Home } from "./screens";

function App() {
    return (
        <>
            <MindMapProvider>
                <Home />
            </MindMapProvider>
        </>
    );
}

export default App;
