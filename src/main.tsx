import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@modules/common";
import NotifyContainer from "@modules/notifications";
import store from "./app/store";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<NotifyContainer />
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>
);
