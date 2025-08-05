import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@modules/common";
import NotifyContainer from "@modules/notifications";
import { MindMapProvider } from "@contexts/MindMapContext";
import "./App.css";
import { Home } from "./screens";
import { NodeStyleBarContextProvider } from "@contexts/NodeStyleBarContext";

function App() {
    return (
        <>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <NotifyContainer />
                <MindMapProvider>
                    <NodeStyleBarContextProvider>
                        <Home />
                    </NodeStyleBarContextProvider>
                </MindMapProvider>
            </ErrorBoundary>
        </>
    );
}

export default App;
