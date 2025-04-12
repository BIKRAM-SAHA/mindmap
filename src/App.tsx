import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@modules/common";
import NotifyContainer from "@modules/notifications";
import { MindMapProvider } from "@contexts/MindMapContext";
import "./App.css";
import { Home } from "./screens";

function App() {
    return (
        <>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <MindMapProvider>
                    <NotifyContainer />
                    <Home />
                </MindMapProvider>
            </ErrorBoundary>
        </>
    );
}

export default App;
