import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@modules/common";
import NotifyContainer from "@modules/notifications";
import "./App.css";
import { Home } from "./screens";

function App() {
    return (
        <>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <NotifyContainer />
                <Home />
            </ErrorBoundary>
        </>
    );
}

export default App;
