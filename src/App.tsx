import NotifyContainer from "@modules/notifications";
import { MindMapProvider } from "@contexts/MindMapContext";
import "./App.css";
import { Home } from "./screens";

function App() {
    return (
        <>
            <MindMapProvider>
                <NotifyContainer />
                <Home />
            </MindMapProvider>
        </>
    );
}

export default App;
